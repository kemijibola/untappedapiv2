"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var resourcePermissionSchema = new mongoose_1.Schema({
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
    // application: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Application',
    //   required: true
    // }
}, { timestamps: true });
exports.ResourcePermissionSchema = mongooseConnection.model('ResourcePermission', resourcePermissionSchema);
//# sourceMappingURL=ResourcePermission.js.map