"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var userAccountSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    bankId: {
        type: Number,
    },
    bankName: {
        type: String,
        required: true,
    },
    bankCode: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
    },
    gatewayRecipientCode: {
        type: String,
    },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.UserAccountSchema = mongooseConnection.model("UserAccount", userAccountSchema);
//# sourceMappingURL=UserAccount.js.map