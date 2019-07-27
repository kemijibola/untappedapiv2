import {
  IVideo,
  IAudio,
  IImage,
  IMedia,
  ITalent
} from '../../app/models/interfaces';
import VideoBusiness from '../../app/business/VideoBusiness';
import AudioBusiness from '../../app/business/AudioBusiness';
import ImageBusiness from '../../app/business/ImageBusiness';

export interface TalentPortfolio {
  medias: IMedia[];
  talent: ITalent;
}

export interface TalentMediaComment {
  count: number;
  talent: ITalent;
}
export async function fetchTalentVideos(userId: string): Promise<IVideo[]> {
  let videos: IVideo[] = [];
  const videoBusiness = new VideoBusiness();
  const talentVideos = await videoBusiness.fetch({ user: userId });
  if (talentVideos.data) videos = [...videos, ...talentVideos.data];
  return videos;
}

export async function fetchTalentAudios(userId: string): Promise<IAudio[]> {
  let audios: IAudio[] = [];
  const audioBusiness = new AudioBusiness();
  const talentAudios = await audioBusiness.fetch({ user: userId });
  if (talentAudios.data) audios = [...audios, ...talentAudios.data];
  return audios;
}

export async function fetchTalentImages(userId: string): Promise<IImage[]> {
  let images: IImage[] = [];
  const imageBusiness = new ImageBusiness();
  const talentImages = await imageBusiness.fetch({ user: userId });
  if (talentImages.data) images = [...images, ...talentImages.data];
  return images;
}
