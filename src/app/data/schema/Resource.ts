import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IResource } from '../../models/interfaces';

const resourceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);
export const ResourceSchema = mongooseConnection.model<IResource>(
  'Resource',
  resourceSchema
);
