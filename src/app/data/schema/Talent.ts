import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ITalent, SocialMedia } from '../../models/interfaces';

const socialMediaSchema: Schema = new Schema({
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
    shortBio: { type: String, required: true, maxlength: 300 },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    socialMedias: [socialMediaSchema],
    profileImagePath: { type: String },
    physicalStats: physicalStatisticsSchema
  },
  { timestamps: true }
);

export const TalentSchema = mongooseConnection.model<ITalent>(
  'Talent',
  talentSchema
);
