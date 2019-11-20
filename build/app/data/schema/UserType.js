"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var userTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application'
    }
}, { timestamps: true });
exports.UserTypeSchema = mongooseConnection.model('UserType', userTypeSchema);
//# sourceMappingURL=UserType.js.map