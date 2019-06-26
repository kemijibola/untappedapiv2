import mongoose from 'mongoose';

export interface ITimeStamp {
  createdAt: Date;
  updateAt?: Date;
}
