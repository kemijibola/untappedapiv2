import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ICountry } from '../../models/interfaces';

const countrySchema: Schema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);
export const CountrySchema = mongooseConnection.model<ICountry>(
  'Country',
  countrySchema
);
