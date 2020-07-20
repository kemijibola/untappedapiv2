"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransctionType;
(function (TransctionType) {
    TransctionType["credit"] = "credit";
    TransctionType["debit"] = "debit";
})(TransctionType = exports.TransctionType || (exports.TransctionType = {}));
var PaymentProviderStatus;
(function (PaymentProviderStatus) {
    PaymentProviderStatus["activated"] = "activated";
    PaymentProviderStatus["deactivated"] = "deactivated";
})(PaymentProviderStatus = exports.PaymentProviderStatus || (exports.PaymentProviderStatus = {}));
var PaymentChannel;
(function (PaymentChannel) {
    PaymentChannel["paystack"] = "paystack";
    PaymentChannel["wallet"] = "wallet";
})(PaymentChannel = exports.PaymentChannel || (exports.PaymentChannel = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["successful"] = "successful";
    TransactionStatus["failed"] = "failed";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
//# sourceMappingURL=TransactionDTO.js.map