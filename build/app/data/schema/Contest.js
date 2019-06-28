"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class ContestSchema {
    static get schema() {
        const evaluationSchema = new mongoose_1.Schema({
            name: { type: String }
        });
        const redeemableSchema = new mongoose_1.Schema({
            prizeType: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'PrizeType',
                required: true
            },
            winners: [{ type: Number, required: true }]
        });
        const schema = new mongoose_1.Schema({
            title: { type: String, required: true },
            information: { type: String, required: true },
            bannerImage: { type: String },
            eligibleCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
            eligibilityInfo: { type: String },
            submissionRules: { type: String },
            startDate: { type: Date, required: true },
            duration: { type: Number, required: true },
            redeemable: redeemableSchema,
            endDate: { type: Date, required: true },
            maxContestant: { type: Number },
            grandFinaleDate: { type: Date },
            grandFinaleLocation: { type: String },
            evaluations: [evaluationSchema],
            createdBy: { type: mongoose_1.Schema.Types.ObjectId, required: true }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Contest', ContestSchema.schema);
module.exports = schema;
