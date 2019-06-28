"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class TalentSchema {
    static get schema() {
        const socialMediaSchema = new mongoose_1.Schema({
            type: { type: String },
            handles: [{ type: String }]
        });
        const physicalStatisticsSchema = new mongoose_1.Schema({
            height: { type: String },
            bodyType: { type: String },
            color: { type: String }
        });
        const schema = new mongoose_1.Schema({
            stageName: { type: String, required: true },
            location: { type: String, required: true },
            phoneNumber: { type: String },
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
            physicalStats: physicalStatisticsSchema
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Talent', TalentSchema.schema);
module.exports = schema;
