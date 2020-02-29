import { IVideo, IAudio, IImage, IMedia } from "../../app/models/interfaces";
import MediaBusiness from "../../app/business/MediaBusiness";
import { UserListViewModel } from "../../app/models/viewmodels";

export interface ITalentPortfolio {
  medias: IMedia[];
  user: UserListViewModel;
}
export interface TalentMediaComment {
  count: number;
  talent: UserListViewModel;
}

export class TalentPortfolio {
  constructor(public userId: string) {}

  static setUp(userId: string): TalentPortfolio {
    return new TalentPortfolio(userId);
  }

  async fetchTalentVideos(): Promise<IVideo[]> {
    let videos: IVideo[] = [];
    const videoBusiness = new MediaBusiness();
    const talentVideos = await videoBusiness.fetch({
      user: this.userId,
      isApproved: true,
      isDeleted: false
    });
    if (talentVideos.data) videos = [...videos, ...talentVideos.data];
    return videos;
  }
  async fetchTalentAudios(): Promise<IAudio[]> {
    let audios: IAudio[] = [];
    const audioBusiness = new MediaBusiness();
    const talentAudios = await audioBusiness.fetch({
      user: this.userId,
      isApproved: true,
      isDeleted: false
    });
    if (talentAudios.data) audios = [...audios, ...talentAudios.data];
    return audios;
  }
  async fetchTalentImages(): Promise<IImage[]> {
    let images: IImage[] = [];
    const imageBusiness = new MediaBusiness();
    const talentImages = await imageBusiness.fetch({
      user: this.userId,
      isApproved: true,
      isDeleted: false
    });
    if (talentImages.data) images = [...images, ...talentImages.data];
    return images;
  }
}
