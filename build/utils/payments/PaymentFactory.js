"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paystack_1 = require("./paymentTypes/paystack");
var error_1 = require("../error");
var PaymentProcessor;
(function (PaymentProcessor) {
    PaymentProcessor["paystack"] = "paystack";
    PaymentProcessor["flutterwave"] = "flutterwave";
    PaymentProcessor["banktransfer"] = "banktransfer";
})(PaymentProcessor = exports.PaymentProcessor || (exports.PaymentProcessor = {}));
var PaymentProcessorStatus;
(function (PaymentProcessorStatus) {
    PaymentProcessorStatus["success"] = "success";
    PaymentProcessorStatus["abandoned"] = "abandoned";
    PaymentProcessorStatus["failed"] = "failed";
    PaymentProcessorStatus["pending"] = "pending";
})(PaymentProcessorStatus = exports.PaymentProcessorStatus || (exports.PaymentProcessorStatus = {}));
var PaymentFactory = /** @class */ (function () {
    function PaymentFactory() {
    }
    PaymentFactory.prototype.create = function (processor) {
        console.log(processor);
        if (processor === "paystack") {
            return new paystack_1.Paystack();
        }
        else {
            throw new error_1.PlatformError({
                code: 400,
                message: "Payment processor is invalid.",
            });
        }
    };
    return PaymentFactory;
}());
exports.PaymentFactory = PaymentFactory;
//# sourceMappingURL=PaymentFactory.js.map