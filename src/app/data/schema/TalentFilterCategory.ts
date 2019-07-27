import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
import {
  FilterCategory,
  ITalentFilterCategory
} from '../../models/interfaces/TalentFilterCategory';
const mongooseConnection = MongodataAccess.mongooseConnection;

const filterCategorySchema = new Schema({
  userId: { path: Schema.Types.ObjectId, ref: 'User', required: true },
  stageName: { type: String, required: true },
  profileImage: { type: String },
  shortBio: { type: String, required: true }
});

const talentFilterCategorySchema = new Schema({
  result: [filterCategorySchema],
  categoryType: { type: FilterCategory, required: true }
});

export const TalentFilterCategorySchema = mongooseConnection.model<
  ITalentFilterCategory
>('TalentFilterCategory', talentFilterCategorySchema);
