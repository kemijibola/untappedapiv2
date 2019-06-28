"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class CommentSchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
            entity: { type: String, required: true },
            comment: { type: String, required: true },
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            replies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Reply' }]
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Comment', CommentSchema.schema);
module.exports = schema;
