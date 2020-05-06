import { IVideo, IAudio, IImage, IMedia } from "../../app/models/interfaces";
import MediaBusiness from "../../app/business/MediaBusiness";
import { UserListViewModel, Talent } from "../../app/models/viewmodels";

export interface ITalentPortfolio {
  medias: IMedia[];
  user: UserListViewModel;
}
export interface TalentMediaComment {
  count: number;
  talent: Talent;
}

export class TalentPortfolio {
  constructor(public userId: string) {}

  static setUp(userId: string): TalentPortfolio {
    return new TalentPortfolio(userId);
  }

  async fetchTalentMedia(): Promise<IMedia[]> {
    let videos: IMedia[] = [];
    const videoBusiness = new MediaBusiness();
    const result = await videoBusiness.fetch({
      user: this.userId,
      isDeleted: false,
    });
    return result.data ? result.data : [];
  }
}
