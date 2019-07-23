import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IVideo, MediaUploadType } from '../../models/interfaces/Media';

const videoItemSchema = new Schema({
  type: { path: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const videoSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [videoItemSchema],
  uploadType: { type: MediaUploadType, required: true },
  isApproved: { type: Boolean, default: false }
});

export const VideoSchema = mongooseConnection.model<IVideo>(
  'Video',
  videoSchema
);
