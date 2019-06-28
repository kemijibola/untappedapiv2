"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class ContestEntrySchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            contest: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Contest',
                required: true
            },
            submissionPath: { type: String, required: true }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('ContestEntry', ContestEntrySchema.schema);
module.exports = schema;
