import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { ITalent } from './Talent';

export enum FilterCategory {
  MostTaps = 'MostTaps',
  HighestComments = 'HighestComments',
  MostWatchedVideos = 'MostWatchedVideos',
  MostPlayedSongs = 'MostPlayedSongs',
  MostLikedPhotos = 'MostLikedPhotos'
}

export interface ITalentFilterCategory extends ITimeStamp, mongoose.Document {
  result: IFilterCategory[];
  categoryType: FilterCategory;
}

export interface IFilterCategory {
  userId: IUser['_id'];
  stageName: string;
  profileImage: string;
  shortBio: string;
}

export interface TalentFilterCategory {
  result: IFilterCategory[];
  categoryType: FilterCategory;
}
