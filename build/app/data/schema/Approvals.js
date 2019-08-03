"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var approvalSchema = new mongoose_1.Schema({
    entity: { type: String, required: true },
    operation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ApprovalOperation',
        required: true
    },
    approved: { type: Boolean, default: false },
    rejectionReasons: { type: String },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    rejectionDate: { type: Date },
    approvedDate: { type: Date },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.ApprovalSchema = mongooseConnection.model('ApprovalSchema', approvalSchema);
//# sourceMappingURL=Approvals.js.map