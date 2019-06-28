import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IProfessional } from '../../models/interfaces';

class ProfessionalSchema {
  static get schema() {
    const socialMediaSchema = new Schema({
      type: { type: String },
      handles: [{ type: String }]
    });

    const schema = new Schema(
      {
        businessName: { type: String, required: true },
        name: { type: String, required: true },
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
        socialMedias: [socialMediaSchema],
        profileImagePath: { type: String },
        bannerImagePath: { type: String }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IProfessional>(
  'Professional',
  ProfessionalSchema.schema
);
export = schema;
