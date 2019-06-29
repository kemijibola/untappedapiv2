"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var CategorySchema = /** @class */ (function () {
    function CategorySchema() {
    }
    Object.defineProperty(CategorySchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: { type: String, required: true }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return CategorySchema;
}());
var schema = mongooseConnection.model('Category', CategorySchema.schema);
module.exports = schema;
//# sourceMappingURL=Category.js.map