"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var UserTypeSchema = /** @class */ (function () {
    function UserTypeSchema() {
    }
    Object.defineProperty(UserTypeSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: {
                    type: String,
                    required: true
                },
                global: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                description: {
                    type: String,
                    required: true
                }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return UserTypeSchema;
}());
var schema = mongooseConnection.model('UserType', UserTypeSchema.schema);
module.exports = schema;
//# sourceMappingURL=UserType.js.map