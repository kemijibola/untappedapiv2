import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ITalent, SocialMedia } from '../../models/interfaces';

export const socialMediaSchema: Schema = new Schema({
  type: { type: SocialMedia },
  handles: [{ type: String }]
});

const physicalStatisticsSchema: Schema = new Schema({
  height: { type: String },
  bodyType: { type: String },
  color: { type: String }
});

const talentSchema: Schema = new Schema(
  {
    stageName: { type: String, required: true },
    location: { type: String, required: true },
    phoneNumbers: [{ type: String, required: true }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    shortBio: { type: String, required: true, minlength: 20, maxlength: 300 },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    socialMedias: [{ type: socialMediaSchema }],
    profileImagePath: { type: String },
    physicalStats: { type: physicalStatisticsSchema },
    tapCount: { type: Number, default: 0 },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const TalentSchema = mongooseConnection.model<ITalent>(
  'Talent',
  talentSchema
);
