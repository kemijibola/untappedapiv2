import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IProfessional } from '../../models/interfaces';

const socialMediaSchema: Schema = new Schema({
  type: { type: String },
  handles: [{ type: String }]
});

const professionalSchema: Schema = new Schema(
  {
    businessName: { type: String, required: true, trim: true },
    officialAddress: { type: String, required: true },
    rcNumber: { type: String },
    phoneNumbers: [{ type: Number, required: true }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    shortBio: { type: String },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    socialMedias: [{ type: socialMediaSchema }],
    bannerImagePath: { type: String },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const ProfessionalSchema = mongooseConnection.model<IProfessional>(
  'Professional',
  professionalSchema
);
