"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var Media_1 = require("../../models/interfaces/Media");
var audioItemSchema = new mongoose_1.Schema({
    type: { path: String, required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
});
var audioSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [audioItemSchema],
    uploadType: { type: Media_1.MediaUploadType, required: true },
    isApproved: { type: Boolean, default: false },
    playedCount: { type: Number, default: 0 }
});
exports.AudioSchema = mongooseConnection.model('Audio', audioSchema);
//# sourceMappingURL=Audio.js.map