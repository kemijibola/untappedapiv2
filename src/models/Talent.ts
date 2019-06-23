import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Talent } from '../interfaces/models';

export const socialMediaSchema = new Schema({
  type: { type: String },
  handles: [{ type: String }]
});

const physicalStatisticsSchema = new Schema({
  height: { type: String },
  bodyType: { type: String },
  color: { type: String }
});

const talentSchema = new Schema(
  {
    stageName: { type: String, required: true },
    location: { type: String, required: true },
    phoneNumber: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shortBio: { type: String },
    categories: [
      { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    ],
    socialMedias: [socialMediaSchema],
    profileImagePath: { type: String },
    physicalStats: physicalStatisticsSchema
  },
  { timestamps: true }
);

const Talent = mongoose.model<Talent>('Talent', talentSchema);
export default Talent;
