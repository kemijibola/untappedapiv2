"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var ContestEntrySchema = /** @class */ (function () {
    function ContestEntrySchema() {
    }
    Object.defineProperty(ContestEntrySchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                user: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                contest: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contest',
                    required: true
                },
                submissionPath: { type: String, required: true }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return ContestEntrySchema;
}());
var schema = mongooseConnection.model('ContestEntry', ContestEntrySchema.schema);
module.exports = schema;
//# sourceMappingURL=ContestEntry.js.map