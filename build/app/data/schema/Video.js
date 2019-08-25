"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var Media_1 = require("../../models/interfaces/Media");
var videoItemSchema = new mongoose_1.Schema({
    index: { type: Number, required: true },
    path: { type: String, required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
});
var videoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: videoItemSchema, required: true }],
    albumCover: { type: String },
    uploadType: { type: Media_1.MediaUploadType, required: true },
    isApproved: { type: Boolean, default: false },
    watchCount: { type: Number, default: 0 },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.VideoSchema = mongooseConnection.model('Video', videoSchema);
//# sourceMappingURL=Video.js.map