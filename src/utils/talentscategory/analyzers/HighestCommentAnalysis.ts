import { Analyzer } from '../Helper/Summary';
import { MatchData } from '../Helper/MatchData';
import {
  TalentFilterCategory,
  FilterCategory,
  IMedia,
  IComment,
  IFilterCategory
} from '../../../app/models/interfaces';

import CommentBusiness from '../../../app/business/CommentBusiness';
import {
  fetchTalentAudios,
  fetchTalentVideos,
  fetchTalentImages,
  TalentMediaComment,
  TalentPortfolio
} from '../TalentPortfolio';

export class HighestCommentAnalysis implements Analyzer {
  run(talents: MatchData[]): TalentFilterCategory {
    let sortedCategory: TalentFilterCategory = {
      result: [],
      categoryType: FilterCategory.HighestComments
    };

    const talentsMedia = talents.reduce((acc: TalentPortfolio[], theItem) => {
      this.fetchTalentMedia(theItem._id).then((data: IMedia[]) => {
        acc.push({
          medias: data,
          talent: theItem
        });
      });
      return acc;
    }, []);

    // fetch talent's media
    let talentsMediaComment: TalentMediaComment[] = [];
    for (let talentMedia of talentsMedia) {
      let mediasCount = 0;
      for (let media of talentMedia.medias) {
        this.fetchTalentMediaComments(media._id).then((data: IComment[]) => {
          mediasCount += data.length - 1;
        });
        talentsMediaComment.push({
          count: mediasCount,
          talent: talentMedia.talent
        });
      }
    }

    talentsMediaComment = talentsMediaComment.sort((a, b) => {
      return b.count - a.count;
    });

    for (let talentMediaComment of talentsMediaComment) {
      const filtered: IFilterCategory = {
        userId: talentMediaComment.talent._id,
        stageName: talentMediaComment.talent.stageName,
        profileImage: talentMediaComment.talent.profileImagePath || '',
        shortBio: talentMediaComment.talent.shortBio
      };
      sortedCategory.result = [...sortedCategory.result, filtered];
    }
    return sortedCategory;
  }

  async fetchTalentMedia(userId: string): Promise<IMedia[]> {
    let medias: IMedia[] = [];
    const audios = await fetchTalentAudios(userId);
    medias = [...medias, ...audios];
    const videos = await fetchTalentVideos(userId);
    medias = [...medias, ...videos];
    const images = await fetchTalentImages(userId);
    medias = [...medias, ...images];
    return medias;
  }

  async fetchTalentMediaComments(mediaId: string): Promise<IComment[]> {
    let mediaComments: IComment[] = [];
    const commentBusiness = new CommentBusiness();
    const comments = await commentBusiness.fetch({ entityId: mediaId });
    if (comments.data) {
      mediaComments = [...mediaComments, ...comments.data];
    }
    return mediaComments;
  }
}
