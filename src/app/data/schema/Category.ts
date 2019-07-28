import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ICategory } from '../../models/interfaces';

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const CategorySchema = mongooseConnection.model<ICategory>(
  'Category',
  categorySchema
);
