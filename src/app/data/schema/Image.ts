import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IImage, MediaUploadType } from '../../models/interfaces/Media';

const imageItemSchema = new Schema({
  index: { type: Number, required: true },
  path: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const imageSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: imageItemSchema, required: true }],
  albumCover: { type: String },
  viewCount: { type: Number, default: 0 },
  uploadType: { type: MediaUploadType, required: true },
  isApproved: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  application: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  }
});

export const ImageSchema = mongooseConnection.model<IImage>(
  'Image',
  imageSchema
);
