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
    global: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
export const UserTypeSchema = mongooseConnection.model<IUserType>(
  'UserType',
  userTypeSchema
);
