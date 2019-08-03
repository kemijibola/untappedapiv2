import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';
import { IService } from './Service';

export interface IContestConfig
  extends ITimeStamp,
    IAppSpec,
    IService,
    mongoose.Document {
  dayFromRange: number;
  dayToRange: number;
}
