import { Request } from 'express';
import { IUser } from '../User';

export interface RequestWithUser extends Request {
  user?: IUser['_id'];
}
