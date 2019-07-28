import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { IAppSpec } from './AppSpec';

export enum ReportType {
  MostTaps = 'MostTaps',
  HighestComments = 'HighestComments',
  MostWatchedVideos = 'MostWatchedVideos',
  MostPlayedSongs = 'MostPlayedSongs',
  MostLikedPhotos = 'MostLikedPhotos'
}

export interface ITalentFilterCategory
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  result: IFilterCategory[];
  categoryType: FilterCategory;
}

export interface IFilterCategory {
  userId: IUser['_id'];
  stageName: string;
  profileImage: string;
  shortBio: string;
}

export interface FilterCategory {
  result: IFilterCategory[];
  categoryType: ReportType;
}
