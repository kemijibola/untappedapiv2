"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var Media_1 = require("../../models/interfaces/Media");
var imageItemSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    path: { type: String, required: true },
    likedBy: [{ type: String }]
}, { timestamps: true });
var imageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: imageItemSchema, required: true }],
    albumCover: { type: String },
    activityCount: { type: Number, default: 0 },
    uploadType: { type: Media_1.MediaUploadType, required: true },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
exports.ImageSchema = mongooseConnection.model("Image", imageSchema);
//# sourceMappingURL=Image.js.map