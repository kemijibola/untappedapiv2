import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IGig } from '../../models/interfaces';

const gigSchema: Schema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    talentCategories: [{ type: Schema.Types.ObjectId }],
    note: { type: String },
    items: [{ type: String }],
    deletedBySender: { type: Boolean, default: false },
    deletedByReciver: { type: Boolean, default: false },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const GigSchema = mongooseConnection.model<IGig>('Gig', gigSchema);
