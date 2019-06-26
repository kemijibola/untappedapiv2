import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ICountry } from '../../models/interfaces';

class CountrySchema {
  static get schema() {
    const schema = mongoose.Schema(
      {
        name: { type: String, required: true }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<ICountry>(
  'Country',
  CountrySchema.schema
);
export = schema;
