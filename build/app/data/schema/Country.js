"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var CountrySchema = /** @class */ (function () {
    function CountrySchema() {
    }
    Object.defineProperty(CountrySchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: { type: String, required: true }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return CountrySchema;
}());
var schema = mongooseConnection.model('Country', CountrySchema.schema);
module.exports = schema;
//# sourceMappingURL=Country.js.map