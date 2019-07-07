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
    global: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.UserTypeSchema = mongooseConnection.model('UserType', userTypeSchema);
//# sourceMappingURL=UserType.js.map