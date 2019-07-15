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
    global: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.RoleSchema = mongooseConnection.model('Role', roleSchema);
//# sourceMappingURL=Role.js.map