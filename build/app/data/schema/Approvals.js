"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var approvalSchema = new mongoose_1.Schema({
    entity: { type: String, required: true },
    operation: { type: interfaces_1.ApprovalOperations, required: true },
    // operation: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'ApprovalOperation',
    //   required: true
    // },
    approved: { type: Boolean, default: false },
    rejectionReasons: { type: String },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    rejectionDate: { type: Date, default: Date.now },
    approvedDate: { type: Date, default: Date.now },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application'
    }
}, { timestamps: true });
exports.ApprovalSchema = mongooseConnection.model('ApprovalSchema', approvalSchema);
//# sourceMappingURL=Approvals.js.map