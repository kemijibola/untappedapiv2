"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var TalentSchema = /** @class */ (function () {
    function TalentSchema() {
    }
    Object.defineProperty(TalentSchema, "schema", {
        get: function () {
            var socialMediaSchema = new mongoose_1.Schema({
                type: { type: String },
                handles: [{ type: String }]
            });
            var physicalStatisticsSchema = new mongoose_1.Schema({
                height: { type: String },
                bodyType: { type: String },
                color: { type: String }
            });
            var schema = new mongoose_1.Schema({
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
        },
        enumerable: true,
        configurable: true
    });
    return TalentSchema;
}());
var schema = mongooseConnection.model('Talent', TalentSchema.schema);
module.exports = schema;
//# sourceMappingURL=Talent.js.map