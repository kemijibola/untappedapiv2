"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var paymentSchema = new mongoose_1.Schema({
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order', required: true },
    amountPaid: { type: Number, required: true },
    paymentChannel: { type: interfaces_1.PaymentChannel, required: true },
    status: { type: interfaces_1.PaymentStatus, default: interfaces_1.PaymentStatus.UnPaid },
    errorMessage: { type: String },
    transactionDate: { type: Date },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.PaymentSchema = mongooseConnection.model('Payment', paymentSchema);
//# sourceMappingURL=Payment.js.map