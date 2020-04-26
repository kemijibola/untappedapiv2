"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var PaymentFactory_1 = require("../../../utils/payments/PaymentFactory");
var orderDetailsSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    orderNumber: { type: String, required: true },
    isDiscountApplied: { type: Boolean, default: false },
    discountAmountApplied: { type: Number, default: 0 },
    isSurchargeApplied: { type: Boolean, default: false },
    surchargeAmountAplied: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: String, required: true }],
    orderStatus: { type: interfaces_1.OrderStatus, default: interfaces_1.OrderStatus.Pending },
    paymentDate: { type: Date },
    error: { type: String },
});
var orderSchema = new mongoose_1.Schema({
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: "Service", required: true },
    referencenNo: { type: String },
    processor: { type: PaymentFactory_1.PaymentProcessor, required: true },
    order: { type: orderDetailsSchema, required: true },
    additionalInfo: { type: String },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.OrderSchema = mongooseConnection.model("Order", orderSchema);
//# sourceMappingURL=Order.js.map