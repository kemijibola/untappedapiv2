"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var ResourceSchema = /** @class */ (function () {
    function ResourceSchema() {
    }
    Object.defineProperty(ResourceSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: { type: String, required: true }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return ResourceSchema;
}());
var schema = mongooseConnection.model('Resource', ResourceSchema.schema);
module.exports = schema;
//# sourceMappingURL=Resource.js.map