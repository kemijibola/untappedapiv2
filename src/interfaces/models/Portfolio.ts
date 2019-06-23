import mongoose from 'mongoose';
import { User } from './User';
import { TimeStamp } from './Timestamp';

export enum MediaType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  IMAGE = 'VIDEO'
}

enum UploadType {
  SINGLE = 'SINGLE',
  ALBUM = 'ALBUM'
}

interface Collection {
  path: string;
  likes: number;
}

export interface Portfolio extends TimeStamp, mongoose.Document {
  title: string;
  description: string;
  user: User;
  mediaType: MediaType;
  uploadType: UploadType;
  items: Collection[];
}
