"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var orderDetailsSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    isDiscountApplied: { type: Boolean, default: false },
    discountAmountApplied: { type: Number },
    totalAmount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: String, required: true }]
});
var orderSchema = new mongoose_1.Schema({
    serviceType: { type: interfaces_1.ServiceType, required: true },
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service', required: true },
    orderNumber: { type: String },
    order: { type: orderDetailsSchema, required: true },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.OrderSchema = mongooseConnection.model('Order', orderSchema);
//# sourceMappingURL=Order.js.map