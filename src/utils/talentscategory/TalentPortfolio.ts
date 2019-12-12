import {
  IVideo,
  IAudio,
  IImage,
  IMedia,
  IProfile
} from "../../app/models/interfaces";
import VideoBusiness from "../../app/business/VideoBusiness";
import AudioBusiness from "../../app/business/AudioBusiness";
import ImageBusiness from "../../app/business/ImageBusiness";
import TalentBusiness from "../../app/business/ProfileBusiness";

export interface ITalentPortfolio {
  medias: IMedia[];
  profile: IProfile;
}
export interface TalentMediaComment {
  count: number;
  profile: IProfile;
}

export class TalentPortfolio {
  constructor(public userId: string) {}

  static setUp(userId: string): TalentPortfolio {
    return new TalentPortfolio(userId);
  }

  async fetchTalentVideos(): Promise<IVideo[]> {
    let videos: IVideo[] = [];
    const videoBusiness = new VideoBusiness();
    const talentVideos = await videoBusiness.fetch({ user: this.userId });
    if (talentVideos.data) videos = [...videos, ...talentVideos.data];
    return videos;
  }
  async fetchTalentAudios(): Promise<IAudio[]> {
    let audios: IAudio[] = [];
    const audioBusiness = new AudioBusiness();
    const talentAudios = await audioBusiness.fetch({ user: this.userId });
    if (talentAudios.data) audios = [...audios, ...talentAudios.data];
    return audios;
  }
  async fetchTalentImages(): Promise<IImage[]> {
    let images: IImage[] = [];
    const imageBusiness = new ImageBusiness();
    const talentImages = await imageBusiness.fetch({ user: this.userId });
    if (talentImages.data) images = [...images, ...talentImages.data];
    return images;
  }

  async fetchTalents(condition: any): Promise<IProfile[]> {
    let talents: IProfile[] = [];
    const talentBusiness = new TalentBusiness();
    const talentsModel = await talentBusiness.fetch(condition);
    talents = talentsModel.data || [];
    return talents;
  }
}
