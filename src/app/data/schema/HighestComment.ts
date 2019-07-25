import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;

const highestCommentSchema = new Schema({

});

export const HighestCommentSchema = mongooseConnection.model<IImage>(
  'HighestComment',
  highestCommentSchema
);
