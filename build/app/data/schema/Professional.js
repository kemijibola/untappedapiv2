"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class ProfessionalSchema {
    static get schema() {
        const socialMediaSchema = new mongoose_1.Schema({
            type: { type: String },
            handles: [{ type: String }]
        });
        const schema = new mongoose_1.Schema({
            businessName: { type: String, required: true },
            name: { type: String, required: true },
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
            socialMedias: [socialMediaSchema],
            profileImagePath: { type: String },
            bannerImagePath: { type: String }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Professional', ProfessionalSchema.schema);
module.exports = schema;
