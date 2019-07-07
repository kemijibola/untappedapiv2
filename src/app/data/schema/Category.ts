import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ICategory } from '../../models/interfaces';

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

export const CategorySchema = mongooseConnection.model<ICategory>(
  'Category',
  categorySchema
);
