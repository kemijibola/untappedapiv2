"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var TransactionDTO_1 = require("../../models/interfaces/custom/TransactionDTO");
var walletDataSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reference: {
        type: Number,
    },
    paymentChannel: {
        type: interfaces_1.PaymentChannel,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    narration: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    transactionType: {
        type: TransactionDTO_1.TransctionType,
    },
    responseCode: {
        type: String,
    },
    responseMessage: {
        type: String,
    },
    status: {
        type: TransactionDTO_1.TransactionStatus,
        required: true,
    },
}, { timestamps: true });
exports.WalletTransactionSchema = mongooseConnection.model("WalletTransaction", walletDataSchema);
//# sourceMappingURL=WalletTransaction.js.map