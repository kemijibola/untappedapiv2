"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var permissionSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, { timestamps: true });
exports.PermissionSchema = mongooseConnection.model('Permission', permissionSchema);
//# sourceMappingURL=Permission.js.map