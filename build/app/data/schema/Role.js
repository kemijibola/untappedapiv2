"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var RoleSchema = /** @class */ (function () {
    function RoleSchema() {
    }
    Object.defineProperty(RoleSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: {
                    type: String,
                    required: true
                },
                userType: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'UserType',
                    required: true
                },
                roleType: {
                    type: String,
                    required: true
                }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return RoleSchema;
}());
var schema = mongooseConnection.model('Role', RoleSchema.schema);
module.exports = schema;
//# sourceMappingURL=Role.js.map