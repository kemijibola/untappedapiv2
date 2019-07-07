"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var roleSchema = new mongoose_1.Schema({
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
        type: interfaces_1.RoleType,
        required: true
    }
}, { timestamps: true });
exports.RoleSchema = mongooseConnection.model('Role', roleSchema);
//# sourceMappingURL=Role.js.map