"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var rolePermissionSchema = new mongoose_1.Schema({
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role", required: true },
    permission: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
    },
    userType: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserType", required: true },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.RolePermissionSchema = mongooseConnection.model("RolePermission", rolePermissionSchema);
//# sourceMappingURL=RolePermission.js.map