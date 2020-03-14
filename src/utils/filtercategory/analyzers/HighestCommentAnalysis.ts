import { Analyzer } from "../Helper/Summary";
import { MatchData } from "../Helper/MatchData";
import {
  IMedia,
  IComment,
  ReportType,
  IUserFilterCategory,
  IAudio,
  MediaType
} from "../../../app/models/interfaces";
import CommentBusiness from "../../../app/business/CommentBusiness";
import { TalentMediaComment, ITalentPortfolio } from "../TalentPortfolio";
import { TalentPortfolio } from "../TalentPortfolio";
import { ObjectKeyString } from "../../lib/Helper";
import { FORMERR } from "dns";

interface TalentMedia {
  user: string;
  medias: IMedia[];
}
export class HighestCommentAnalysis implements Analyzer {
  talentPortfolio: ITalentPortfolio[] = [];
  talentMediaComment: TalentMediaComment[] = [];
  async run(users: MatchData[]): Promise<IUserFilterCategory[]> {
    var filteredCategories: IUserFilterCategory[] = [];

    let talentMediaCommentMap: any = {};
    let talentMedia: IMedia[] = [];

    for (let item of users) {
      const talentMedia = await this.fetchTalentMedia(item.user);
      if (talentMedia.length > 0) {
        talentMediaCommentMap[item.user] = talentMedia;
      }
    }

    for (let key in talentMediaCommentMap) {
      let mediaCounter = 0;
      var userMedias: IMedia[] = talentMediaCommentMap[key];
      for (let media of userMedias) {
        const mediaComment = await this.fetchTalentMediaComments(media._id);
        const mediaCount = mediaComment.length > 0 ? mediaComment.length : 0;
        mediaCounter = mediaCounter + mediaCount;
      }
      // user key to fetch user from users and push to this.talentMediaComment

      var talent = users.filter(x => x.user == key)[0];
      this.talentMediaComment.push({
        count: mediaCounter,
        talent
      });
    }

    this.talentMediaComment = this.talentMediaComment.sort((a, b) => {
      return b.count - a.count;
    });

    console.log(this.talentMediaComment);
    for (let talentMediaComment of this.talentMediaComment) {
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
    const allMedia = await talentPortfolio.fetchTalentMedia();
    const userAudios = allMedia.filter(x => x.mediaType === MediaType.audio);
    medias = [...medias, ...userAudios];
    const userImages = allMedia.filter(x => x.mediaType === MediaType.image);
    medias = [...medias, ...userImages];
    const userVideos = allMedia.filter(x => x.mediaType === MediaType.video);
    medias = [...medias, ...userVideos];
    return medias;
  }

  async fetchTalentMediaComments(mediaId: string): Promise<IComment[]> {
    const commentBusiness = new CommentBusiness();
    const comments = await commentBusiness.fetch({ entityId: mediaId });
    return comments.data ? comments.data : [];
  }
}
