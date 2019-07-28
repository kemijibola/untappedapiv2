import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
import {
  FilterCategory,
  ITalentFilterCategory,
  ReportType
} from '../../models/interfaces/TalentFilterCategory';
const mongooseConnection = MongodataAccess.mongooseConnection;

const filterCategorySchema = new Schema({
  userId: { path: Schema.Types.ObjectId, ref: 'User', required: true },
  stageName: { type: String, required: true },
  profileImage: { type: String },
  shortBio: { type: String, required: true }
});

const talentFilterCategorySchema = new Schema({
  result: [{ type: filterCategorySchema, required: true }],
  categoryType: { type: ReportType, required: true },
  application: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  }
});

export const TalentFilterCategorySchema = mongooseConnection.model<
  ITalentFilterCategory
>('TalentFilterCategory', talentFilterCategorySchema);
