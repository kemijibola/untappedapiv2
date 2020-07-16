"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var transactionRequestSchema = new mongoose_1.Schema({
    providerId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    narration: {
        type: String,
    },
    requestType: {
        type: String,
        required: true,
    },
    responseStatus: {
        type: String,
    },
    responseMessage: {
        type: String,
    },
    transactionDate: {
        type: String,
    },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.TransactionRequestSchema = mongooseConnection.model("TransactionRequest", transactionRequestSchema);
//# sourceMappingURL=TransactionRequest.js.map