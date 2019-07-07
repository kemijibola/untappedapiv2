import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export enum ApprovalOperations {
  ImageUpload = 'ImageUpload',
  AudioUpload = 'AudioUpload',
  VideoUpload = 'VideoUpload',
  ContestCreated = 'ContestCreated',
  ContestEntrySubmitted = 'ContestEntrySubmitted'
}

export interface IApproval extends ITimeStamp, mongoose.Document {
  entity: string;
  operation: ApprovalOperations;
  approved: boolean;
  rejectionReasons: string;
  approvedBy: string;
  rejectionDate: Date;
  approvedDate: Date;
}
