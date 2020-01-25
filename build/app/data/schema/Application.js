"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var applicationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    dbUri: { type: String },
    audience: { type: String, required: true },
    clientId: { type: String, required: true },
    emailConfirmationRedirectUrl: { type: String, required: true },
    redirectBaseUrl: { type: String },
    clientSecret: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    approvedDate: { type: Date }
}, { timestamps: true });
exports.ApplicationSchema = mongooseConnection.model("Application", applicationSchema);
//# sourceMappingURL=Application.js.map