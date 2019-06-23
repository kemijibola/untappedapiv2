import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { UserType } from '../interfaces/models';

const userTypeSchma = new Schema(
  {
    name: { type: String, required: true },
    global: { type: Boolean, required: true, default: false },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

const UserType = mongoose.model<UserType>('UserType', userTypeSchma);
export default UserType;
