"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class GigSchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
            sender: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            receiver: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            note: { type: String },
            items: [{ type: String }],
            deletedBySender: { type: Boolean, default: false },
            deletedByReciver: { type: Boolean, default: false }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Gig', GigSchema.schema);
module.exports = schema;
