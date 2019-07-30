"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceType;
(function (ServiceType) {
    ServiceType["OnlineContest"] = "OnlineContest";
    ServiceType["ContactDetailsRequest"] = "ContactDetailsRequest";
})(ServiceType = exports.ServiceType || (exports.ServiceType = {}));
var PaymentChannel;
(function (PaymentChannel) {
    PaymentChannel["PayStack"] = "PayStack";
    PaymentChannel["InterSwitch"] = "InterSwitch";
    PaymentChannel["Cash"] = "Cash";
})(PaymentChannel = exports.PaymentChannel || (exports.PaymentChannel = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Completed"] = "Completed";
    PaymentStatus["Failed"] = "Failed";
    PaymentStatus["Pending"] = "Pending";
    PaymentStatus["UnPaid"] = "UnPaid";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
//# sourceMappingURL=Payment.js.map