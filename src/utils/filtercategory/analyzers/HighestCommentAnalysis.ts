import { Analyzer } from "../Helper/Summary";
import { MatchData } from "../Helper/MatchData";
import {
  IMedia,
  IComment,
  ReportType,
  IUserFilterCategory
} from "../../../app/models/interfaces";
import CommentBusiness from "../../../app/business/CommentBusiness";
import { TalentMediaComment, ITalentPortfolio } from "../TalentPortfolio";
import { TalentPortfolio } from "../TalentPortfolio";

export class HighestCommentAnalysis implements Analyzer {
  run(users: MatchData[]): IUserFilterCategory[] {
    var filteredCategories: IUserFilterCategory[] = [];
    const talentsMedia = users.reduce((acc: ITalentPortfolio[], theItem) => {
      this.fetchTalentMedia(theItem.user).then((data: IMedia[]) => {
        acc.push({
          medias: data,
          user: theItem
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
          talent: talentMedia.user
        });
      }
    }

    talentsMediaComment = talentsMediaComment.sort((a, b) => {
      return b.count - a.count;
    });

    for (let talentMediaComment of talentsMediaComment) {
      const filtered: IUserFilterCategory = Object.assign({
        user: talentMediaComment.talent.user,
        displayName: talentMediaComment.talent.displayName,
        displayPhoto: talentMediaComment.talent.displayPhoto,
        shortDescription: talentMediaComment.talent.shortDescription || "",        
        categories: talentMediaComment.talent.categories || [],
        reportType: ReportType.HighestComment,
        userType: talentMediaComment.talent.userType
      });
      filteredCategories = [...filteredCategories, filtered];
    }
    return filteredCategories;
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
