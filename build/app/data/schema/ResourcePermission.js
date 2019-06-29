"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var ResourcePermissionSchema = /** @class */ (function () {
    function ResourcePermissionSchema() {
    }
    Object.defineProperty(ResourcePermissionSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                resource: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Resource',
                    required: true
                },
                role: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Role',
                    required: true
                },
                permissions: [
                    {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: 'Permission',
                        required: true
                    }
                ]
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return ResourcePermissionSchema;
}());
var schema = mongooseConnection.model('ResourcePermission', ResourcePermissionSchema.schema);
module.exports = schema;
//# sourceMappingURL=ResourcePermission.js.map