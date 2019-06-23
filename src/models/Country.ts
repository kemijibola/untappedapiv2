import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Country } from '../interfaces/models';

const countrySchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Country = mongoose.model<Country>('Country', countrySchema);
export default Country;
