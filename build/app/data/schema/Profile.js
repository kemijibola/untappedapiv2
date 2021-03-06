"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
exports.socialMediaSchema = new mongoose_1.Schema({
    type: { type: interfaces_1.SocialMediaTypes },
    handle: { type: String },
});
var physicalStatisticsSchema = new mongoose_1.Schema({
    height: { type: String },
    bodyType: { type: String },
    color: { type: String },
});
var profileSchema = new mongoose_1.Schema({
    name: { type: String },
    rcNumber: { type: String },
    location: { type: String },
    formattedAddres: { type: String },
    phoneNumbers: [{ type: String }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shortBio: { type: String, minlength: 80, maxlength: 2500 },
    categoryTypes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "CategoryType",
            required: true,
        },
    ],
    tappedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    additionalSocial: [{ type: String }],
    physicalStats: { type: physicalStatisticsSchema },
    tapCount: { type: Number, default: 0 },
}, { timestamps: true });
exports.ProfileSchema = mongooseConnection.model("Profile", profileSchema);
//# sourceMappingURL=Profile.js.map