"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    userType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserType'
    },
    description: {
        type: String
    },
    isDefault: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.RoleSchema = mongooseConnection.model('Role', roleSchema);
//# sourceMappingURL=Role.js.map