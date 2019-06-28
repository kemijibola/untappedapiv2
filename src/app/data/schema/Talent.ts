import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ITalent } from '../../models/interfaces';

class TalentSchema {
  static get schema() {
    const socialMediaSchema = new Schema({
      type: { type: String },
      handles: [{ type: String }]
    });

    const physicalStatisticsSchema = new Schema({
      height: { type: String },
      bodyType: { type: String },
      color: { type: String }
    });
    const schema = new Schema(
      {
        stageName: { type: String, required: true },
        location: { type: String, required: true },
        phoneNumber: { type: String },
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
        physicalStats: physicalStatisticsSchema
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<ITalent>('Talent', TalentSchema.schema);
export = schema;
