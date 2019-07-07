"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var collectionSchema = new mongoose_1.Schema({
    path: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 }
});
var portfolioSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mediaType: { type: interfaces_1.MediaType, required: true },
    uploadType: { type: interfaces_1.UploadType, required: true },
    items: [collectionSchema],
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });
exports.PortfolioSchema = mongooseConnection.model('Portfolio', portfolioSchema);
//# sourceMappingURL=Portfolio.js.map