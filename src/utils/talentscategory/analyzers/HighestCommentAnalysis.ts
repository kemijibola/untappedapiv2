import { Analyzer } from "../Helper/Summary";
import { MatchData } from "../Helper/MatchData";
import {
  FilterCategory,
  IMedia,
  IComment,
  IFilterCategory,
  ReportType
} from "../../../app/models/interfaces";
import CommentBusiness from "../../../app/business/CommentBusiness";
import { TalentMediaComment, ITalentPortfolio } from "../TalentPortfolio";
import { TalentPortfolio } from "../TalentPortfolio";

export class HighestCommentAnalysis implements Analyzer {
  run(talents: MatchData[]): FilterCategory {
    let sortedCategory: FilterCategory = {
      result: [],
      categoryType: ReportType.HighestComments
    };
    const talentsMedia = talents.reduce((acc: ITalentPortfolio[], theItem) => {
      this.fetchTalentMedia(theItem._id).then((data: IMedia[]) => {
        acc.push({
          medias: data,
          profile: theItem
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
          profile: talentMedia.profile
        });
      }
    }

    talentsMediaComment = talentsMediaComment.sort((a, b) => {
      return b.count - a.count;
    });

    for (let talentMediaComment of talentsMediaComment) {
      const filtered: IFilterCategory = {
        userId: talentMediaComment.profile._id,
        name: talentMediaComment.profile.name || "",
        // profileImage: talentMediaComment.talent.profileImagePath || '',
        profileImage: "",
        shortBio: talentMediaComment.profile.shortBio || ""
      };
      sortedCategory.result = [...sortedCategory.result, filtered];
    }
    return sortedCategory;
  }

  async fetchTalentMedia(userId: string): Promise<IMedia[]> {
    let medias: IMedia[] = [];
    const talentPortfolio = TalentPortfolio.setUp(userId);

    const audios = await talentPortfolio.fetchTalentAudios();
    medias = [...medias, ...audios];
    const videos = await talentPortfolio.fetchTalentVideos();
    medias = [...medias, ...videos];
    const images = await talentPortfolio.fetchTalentImages();
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
