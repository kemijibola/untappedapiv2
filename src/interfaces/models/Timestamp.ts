import mongoose from 'mongoose';
import { User } from './User';

export interface TimeStamp {
  createdAt: Date;
  updateAt?: Date;
}
