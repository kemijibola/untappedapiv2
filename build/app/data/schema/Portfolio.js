"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class PortfolioSchema {
    static get schema() {
        const collectionSchema = new mongoose_1.Schema({
            path: { type: String, required: true },
            likes: { type: Number, required: true, default: 0 }
        });
        const schema = new mongoose_1.Schema({
            title: { type: String, required: true },
            description: { type: String },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            mediaType: { type: String, required: true },
            uploadType: { type: String, required: true },
            items: [collectionSchema]
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Portfolio', PortfolioSchema.schema);
module.exports = schema;
