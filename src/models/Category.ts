import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Category } from '../interfaces/models';

const categorySchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Category = mongoose.model<Category>('Category', categorySchema);
export default Category;
