"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var payer_1 = require("../payer");
var config = module.require("../../../config/keys");
var request = __importStar(require("request-promise"));
var PaymentFactory_1 = require("../PaymentFactory");
var Paystack = /** @class */ (function (_super) {
    __extends(Paystack, _super);
    function Paystack() {
        var _this = _super.call(this) || this;
        _this.payStackVerifyUrl = "https://api.paystack.co/transaction/verify";
        return _this;
    }
    Paystack.prototype.verifyPayment = function (referenceNo) {
        return __awaiter(this, void 0, void 0, function () {
            var payStackResponse, options, verified, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("reference no", referenceNo);
                        payStackResponse = {
                            amount: 0,
                            requestStatus: false,
                            transactionDate: new Date(),
                            status: PaymentFactory_1.PaymentProcessorStatus.pending,
                            reference: "",
                            gatewayReponse: "",
                            channel: "",
                            ipAddress: "",
                            requestedAmount: 0,
                            message: "",
                            customerId: "",
                        };
                        options = {
                            uri: this.payStackVerifyUrl + "/" + referenceNo,
                            headers: {
                                Authorization: "Bearer " + config.PAYMENT_SECRETS.paystack_secret,
                            },
                            json: true,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request.get(options)];
                    case 2:
                        verified = _a.sent();
                        if (verified.status) {
                            payStackResponse = {
                                amount: verified.data.amount / 100,
                                requestStatus: verified.status,
                                transactionDate: verified.data.transaction_date,
                                status: verified.data.status,
                                reference: verified.data.reference,
                                gatewayReponse: verified.data.gateway_response,
                                channel: verified.data.channel,
                                ipAddress: verified.data.ip_address,
                                requestedAmount: verified.data.requested_amount,
                                message: verified.data.message,
                                customerId: verified.customer.email,
                            };
                        }
                        else {
                            payStackResponse = {
                                amount: 0,
                                requestStatus: verified.status,
                                transactionDate: new Date(),
                                status: PaymentFactory_1.PaymentProcessorStatus.failed,
                                reference: referenceNo,
                                gatewayReponse: verified.message,
                                channel: "",
                                ipAddress: "",
                                requestedAmount: 0,
                                message: verified.message,
                                customerId: "",
                            };
                        }
                        return [2 /*return*/, payStackResponse];
                    case 3:
                        err_1 = _a.sent();
                        payStackResponse = {
                            amount: 0,
                            requestStatus: false,
                            transactionDate: new Date(),
                            status: PaymentFactory_1.PaymentProcessorStatus.failed,
                            reference: referenceNo,
                            gatewayReponse: err_1,
                            channel: "",
                            ipAddress: "",
                            requestedAmount: 0,
                            message: "Error from PayStack",
                            customerId: "",
                        };
                        return [2 /*return*/, payStackResponse];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Paystack;
}(payer_1.AbstractPayment));
exports.Paystack = Paystack;
//# sourceMappingURL=paystack.js.map