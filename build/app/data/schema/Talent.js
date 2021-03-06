"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
exports.socialMediaSchema = new mongoose_1.Schema({
    type: { type: interfaces_1.SocialMedia },
    handles: [{ type: String }]
});
var physicalStatisticsSchema = new mongoose_1.Schema({
    height: { type: String },
    bodyType: { type: String },
    color: { type: String }
});
var talentSchema = new mongoose_1.Schema({
    stageName: { type: String, required: true },
    location: { type: String, required: true },
    phoneNumbers: [{ type: String, required: true }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shortBio: { type: String, required: true, minlength: 20, maxlength: 300 },
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    socialMedias: [{ type: exports.socialMediaSchema }],
    physicalStats: { type: physicalStatisticsSchema },
    tapCount: { type: Number, default: 0 },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.TalentSchema = mongooseConnection.model('Talent', talentSchema);
//# sourceMappingURL=Talent.js.map