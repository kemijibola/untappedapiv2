"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransferStatusType;
(function (TransferStatusType) {
    TransferStatusType["pending"] = "pending";
    TransferStatusType["success"] = "success";
})(TransferStatusType = exports.TransferStatusType || (exports.TransferStatusType = {}));
var PaymentGatewayType;
(function (PaymentGatewayType) {
    PaymentGatewayType["paystack"] = "paystack";
    PaymentGatewayType["flutterwave"] = "flutterwave";
})(PaymentGatewayType = exports.PaymentGatewayType || (exports.PaymentGatewayType = {}));
exports.PaystackWebhookEvent = {
    "transfer.success": "transfer.success",
    "transfer.failed": "transfer.failed",
};
var AbstractPayment = /** @class */ (function () {
    function AbstractPayment() {
    }
    return AbstractPayment;
}());
exports.AbstractPayment = AbstractPayment;
// export class Payer {
//   constructor(public payment: AbstractPayment) {}
//   static init(payment: AbstractPayment): Payer {
//     return new Payer(payment);
//   }
//   async verifyPayment(reference: string): Promise<PaymentGatewayResponse> {
//     return await this.payment.verifyPayment(reference);
//   }
// }
//# sourceMappingURL=payer.js.map