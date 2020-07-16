"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var TransactionDTO_1 = require("../../models/interfaces/custom/TransactionDTO");
var walletDataSchema = new mongoose_1.Schema({
    walletNumber: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    status: {
        type: TransactionDTO_1.PaymentProviderStatus,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.WalletDataSchema = mongooseConnection.model("WalletData", walletDataSchema);
//# sourceMappingURL=WalletData.js.map