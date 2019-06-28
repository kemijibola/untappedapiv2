"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class PrizeTypeSchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
            name: { type: String, required: true }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('PrizeType', PrizeTypeSchema.schema);
module.exports = schema;
