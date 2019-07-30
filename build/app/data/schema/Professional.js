"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var socialMediaSchema = new mongoose_1.Schema({
    type: { type: String },
    handles: [{ type: String }]
});
var professionalSchema = new mongoose_1.Schema({
    businessName: { type: String, required: true, trim: true },
    officialAddress: { type: String, required: true },
    rcNumber: { type: String },
    phoneNumbers: [{ type: Number, required: true }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shortBio: { type: String },
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    socialMedias: [{ type: socialMediaSchema }],
    profileImagePath: { type: String },
    bannerImagePath: { type: String },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.ProfessionalSchema = mongooseConnection.model('Professional', professionalSchema);
//# sourceMappingURL=Professional.js.map