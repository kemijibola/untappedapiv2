import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Professional } from '../interfaces/models';
import { socialMediaSchema } from './Talent';

const professionalSchema = new Schema(
  {
    businessName: { type: String, required: true },
    name: { type: String, required: true },
    officialAddress: { type: String, required: true },
    rcNumber: { type: String },
    phoneNumbers: [{ type: Number, required: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shortBio: { type: String },
    categories: [
      { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    ],
    socialMedias: [socialMediaSchema],
    profileImagePath: { type: String },
    bannerImagePath: { type: String }
  },
  { timestamps: true }
);

const Professional = mongoose.model<Professional>(
  'Professional',
  professionalSchema
);
export default Professional;
