"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var ContestSchema = /** @class */ (function () {
    function ContestSchema() {
    }
    Object.defineProperty(ContestSchema, "schema", {
        get: function () {
            var evaluationSchema = new mongoose_1.Schema({
                name: { type: String }
            });
            var redeemableSchema = new mongoose_1.Schema({
                prizeType: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'PrizeType',
                    required: true
                },
                winners: [{ type: Number, required: true }]
            });
            var schema = new mongoose_1.Schema({
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
        },
        enumerable: true,
        configurable: true
    });
    return ContestSchema;
}());
var schema = mongooseConnection.model('Contest', ContestSchema.schema);
module.exports = schema;
//# sourceMappingURL=Contest.js.map