import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IUserType } from '../../models/interfaces';

const userTypeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application'
    }
  },
  { timestamps: true }
);

export const UserTypeSchema = mongooseConnection.model<IUserType>(
  'UserType',
  userTypeSchema
);
