"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var permissionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: interfaces_1.PermissionType, required: true }
}, { timestamps: true });
exports.PermissionSchema = mongooseConnection.model('Permission', permissionSchema);
//# sourceMappingURL=Permission.js.map