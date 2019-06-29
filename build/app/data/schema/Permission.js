"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var PermissionSchema = /** @class */ (function () {
    function PermissionSchema() {
    }
    Object.defineProperty(PermissionSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: { type: String, required: true }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return PermissionSchema;
}());
var schema = mongooseConnection.model('Permission', PermissionSchema.schema);
module.exports = schema;
//# sourceMappingURL=Permission.js.map