import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export enum ApprovalOperations {
  ImageUpload = 'ImageUpload',
  AudioUpload = 'AudioUpload',
  VideoUpload = 'VideoUpload',
  ContestCreated = 'ContestCreated',
  ContestEntrySubmitted = 'ContestEntrySubmitted',
  CreateRole = 'CreateRole',
  CreateCategoryIssue = 'CreateCategoryIssue',
  CreateDomain = 'CreateDomain',
  CreateApplication = 'CreateApplication',
  CreateResource = 'CreateResource',
  CreateResourcePermission = 'CreateResourcePermission',
  CreateService = 'CreateService',
  CreateUserType = 'CreateUserType'
}

export interface IApproval extends ITimeStamp, IAppSpec, mongoose.Document {
  entity: string;
  operation: ApprovalOperations;
  approved: boolean;
  rejectionReasons: string;
  approvedBy: string;
  rejectionDate: Date;
  approvedDate: Date;
}
