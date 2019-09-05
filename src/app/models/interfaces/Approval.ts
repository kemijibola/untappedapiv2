import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';
import { IApprovalOperation } from './ApprovalOperation';

export enum ApprovalOperations {
  ImageUpload = 'Image Upload',
  AudioUpload = 'Audio Upload',
  VideoUpload = 'Video Upload',
  ContestCreated = 'Contest Created',
  ContestSubmission = 'Contest Submitted',
  Role = 'Role',
  CategoryIssue = 'CategoryIssue',
  Domain = 'Domain',
  Application = 'Application',
  Resource = 'Resource',
  ResourcePermission = 'ResourcePermission',
  Service = 'Service',
  UserType = 'UserType'
}

export interface IApproval extends ITimeStamp, IAppSpec, mongoose.Document {
  entity: string;
  operation: ApprovalOperations;
  approved: boolean;
  rejectionReasons?: string;
  approvedBy?: string;
  rejectionDate?: Date;
  approvedDate?: Date;
}
