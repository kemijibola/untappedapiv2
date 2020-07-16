"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var TransactionDTO_1 = require("../../models/interfaces/custom/TransactionDTO");
var walletDataSchema = new mongoose_1.Schema({
    walletId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "WalletData",
        required: true,
    },
    requestId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "TransactionRequest",
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
}, { timestamps: true });
exports.WalletTransactionSchema = mongooseConnection.model("WalletTransaction", walletDataSchema);
//# sourceMappingURL=WalletTransaction.js.map