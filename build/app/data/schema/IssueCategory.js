"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var issueSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    approveDate: { type: Date },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.IssueCategorySchema = mongooseConnection.model('IssueCategory', issueSchema);
//# sourceMappingURL=IssueCategory.js.map