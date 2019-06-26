"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class TalentSchema {
    static get schema() {
        const socialMediaSchema = mongoose.Schema({
            type: { type: String },
            handles: [{ type: String }]
        });
        const physicalStatisticsSchema = mongoose.Schema({
            height: { type: String },
            bodyType: { type: String },
            color: { type: String }
        });
        const schema = mongoose.Schema({
            stageName: { type: String, required: true },
            location: { type: String, required: true },
            phoneNumber: { type: String },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            shortBio: { type: String },
            categories: [
                {
                    type: mongoose.Schema.Types.ObjectId,
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
