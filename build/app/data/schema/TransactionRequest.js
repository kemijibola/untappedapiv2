"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var TransactionDTO_1 = require("../../models/interfaces/custom/TransactionDTO");
var transactionRequestSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentReference: {
        type: String,
    },
    externalReference: {
        type: String,
    },
    narration: {
        type: String,
    },
    paymentChannel: {
        type: String,
        required: true,
    },
    transactionType: {
        type: TransactionDTO_1.TransctionType,
        required: true,
    },
    transferCode: {
        type: String,
    },
    responseCode: {
        type: Number,
    },
    responseMessage: {
        type: String,
    },
    currency: {
        type: String,
        required: true,
    },
    transactionDate: {
        type: Date,
    },
    transactionStatus: {
        type: String,
    },
    responseBody: {
        type: String,
    },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.TransactionRequestSchema = mongooseConnection.model("TransactionRequest", transactionRequestSchema);
//# sourceMappingURL=TransactionRequest.js.map