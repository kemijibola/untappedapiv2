import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IImage } from '../../models/interfaces/Media';

const imageItemSchema = new Schema({
  type: { path: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const imageSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [imageItemSchema],
  isApproved: { type: Boolean, default: false }
});

export const ImageSchema = mongooseConnection.model<IImage>(
  'Image',
  imageSchema
);
