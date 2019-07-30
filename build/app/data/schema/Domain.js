"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var domainSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    rcNumber: { type: String },
    address: { type: String, required: true },
    isApproved: { type: Boolean, default: true },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    approvedDate: { type: Date },
    country: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Country', required: true }
}, { timestamps: true });
exports.DomainSchema = mongooseConnection.model('Domain', domainSchema);
//# sourceMappingURL=Domain.js.map