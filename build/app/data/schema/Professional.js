"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var ProfessionalSchema = /** @class */ (function () {
    function ProfessionalSchema() {
    }
    Object.defineProperty(ProfessionalSchema, "schema", {
        get: function () {
            var socialMediaSchema = new mongoose_1.Schema({
                type: { type: String },
                handles: [{ type: String }]
            });
            var schema = new mongoose_1.Schema({
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
        },
        enumerable: true,
        configurable: true
    });
    return ProfessionalSchema;
}());
var schema = mongooseConnection.model('Professional', ProfessionalSchema.schema);
module.exports = schema;
//# sourceMappingURL=Professional.js.map