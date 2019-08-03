"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var approvalOperationSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.ApprovalOperationSchema = mongooseConnection.model('ApprovalOperation', approvalOperationSchema);
//# sourceMappingURL=ApprovalOperation.js.map