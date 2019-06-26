"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class CategorySchema {
    static get schema() {
        const schema = mongoose.Schema({
            name: { type: String, required: true }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Category', CategorySchema.schema);
module.exports = schema;
