import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IVideo, MediaUploadType } from '../../models/interfaces/Media';

const videoItemSchema = new Schema({
  index: { type: Number, required: true },
  path: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: videoItemSchema, required: true }],
    albumCover: { type: String },
    uploadType: { type: MediaUploadType, required: true },
    isApproved: { type: Boolean, default: false },
    watchCount: { type: Number, default: 0 },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const VideoSchema = mongooseConnection.model<IVideo>(
  'Video',
  videoSchema
);
