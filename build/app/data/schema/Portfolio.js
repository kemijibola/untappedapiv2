"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class PortfolioSchema {
    static get schema() {
        const collectionSchema = mongoose.Schema({
            path: { type: String, required: true },
            likes: { type: Number, required: true, default: 0 }
        });
        const schema = mongoose.Schema({
            title: { type: String, required: true },
            description: { type: String },
            user: {
                type: mongoose.Schema.Types.ObjectId,
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
