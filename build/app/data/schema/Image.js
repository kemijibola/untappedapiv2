"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var imageItemSchema = new mongoose_1.Schema({
    type: { path: String, required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
});
var imageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [imageItemSchema],
    isApproved: { type: Boolean, default: false }
});
exports.ImageSchema = mongooseConnection.model('Image', imageSchema);
//# sourceMappingURL=Image.js.map