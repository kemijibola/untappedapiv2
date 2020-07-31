"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var Media_1 = require("../../models/interfaces/Media");
var mediaItemSchema = new mongoose_1.Schema({
    path: { type: String, required: true },
    likedBy: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    approvedBy: { type: String },
    approvedDate: { type: Date },
}, { timestamps: true });
var mediaSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: mediaItemSchema, required: true }],
    albumCover: { type: String },
    activityCount: { type: Number, default: 0 },
    uploadType: { type: Media_1.MediaUploadType, required: true },
    mediaType: { type: Media_1.MediaType, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.MediaSchema = mongooseConnection.model("Media", mediaSchema);
//# sourceMappingURL=Media.js.map