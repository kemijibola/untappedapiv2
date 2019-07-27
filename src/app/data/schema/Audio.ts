import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IAudio, MediaUploadType } from '../../models/interfaces/Media';

const audioItemSchema = new Schema({
  type: { path: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const audioSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [audioItemSchema],
  uploadType: { type: MediaUploadType, required: true },
  isApproved: { type: Boolean, default: false },
  playedCount: { type: Number, default: 0 }
});

export const AudioSchema = mongooseConnection.model<IAudio>(
  'Audio',
  audioSchema
);
