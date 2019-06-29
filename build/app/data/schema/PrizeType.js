"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var PrizeTypeSchema = /** @class */ (function () {
    function PrizeTypeSchema() {
    }
    Object.defineProperty(PrizeTypeSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: { type: String, required: true }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return PrizeTypeSchema;
}());
var schema = mongooseConnection.model('PrizeType', PrizeTypeSchema.schema);
module.exports = schema;
//# sourceMappingURL=PrizeType.js.map