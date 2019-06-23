import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Resource } from '../interfaces/models';

const resourceSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Resource = mongoose.model<Resource>('Resource', resourceSchema);
export default Resource;
