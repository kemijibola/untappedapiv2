"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var OrderRepository_1 = __importDefault(require("../repository/OrderRepository"));
var ServiceRepository_1 = __importDefault(require("../repository/ServiceRepository"));
var UserRepository_1 = __importDefault(require("../repository/UserRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var Helper_1 = require("../../utils/lib/Helper");
var PaymentFactory_1 = require("../../utils/payments/PaymentFactory");
var settlementHandler_1 = require("../../utils/payments/settlementHandler");
var date_fns_1 = require("date-fns");
var OrderBusiness = /** @class */ (function () {
    function OrderBusiness() {
        this._orderRepository = new OrderRepository_1.default();
        this._serviceRepository = new ServiceRepository_1.default();
        this._userRepository = new UserRepository_1.default();
    }
    OrderBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._orderRepository.fetch(condition)];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, orders)];
                }
            });
        });
    };
    OrderBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._orderRepository.findById(id)];
                    case 1:
                        order = _a.sent();
                        if (!order)
                            return [2 /*return*/, Result_1.Result.fail(404, "Order of Id " + id + " not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, order)];
                }
            });
        });
    };
    OrderBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._orderRepository.findByOne(condition)];
                    case 1:
                        order = _a.sent();
                        if (!order)
                            return [2 /*return*/, Result_1.Result.fail(404, "Order not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, order)];
                }
            });
        });
    };
    OrderBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._orderRepository.findByCriteria(criteria)];
                    case 1:
                        order = _a.sent();
                        if (!order)
                            return [2 /*return*/, Result_1.Result.fail(404, "Order not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, order)];
                }
            });
        });
    };
    OrderBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var service, processors, calculatedAmount, newOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._serviceRepository.findById(item.service)];
                    case 1:
                        service = _a.sent();
                        if (!service)
                            return [2 /*return*/, Result_1.Result.fail(404, "Service not found")];
                        if (item.order.quantity < 1)
                            return [2 /*return*/, Result_1.Result.fail(400, "Please provide at least 1 item in order")];
                        processors = Object.values(PaymentFactory_1.PaymentProcessor);
                        if (!processors.includes(item.processor))
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid Payment processor")];
                        if (item.order.items.length < 1)
                            return [2 /*return*/, Result_1.Result.fail(400, "Please provide at least 1 order item")];
                        if (item.order.amount < 1)
                            return [2 /*return*/, Result_1.Result.fail(400, "Please provide valid order amount")];
                        calculatedAmount = service.price + item.order.amount * item.order.quantity;
                        if (calculatedAmount !== item.order.totalAmount)
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid totalAmount")];
                        item.order.orderNumber = Helper_1.generateInvoiceNo();
                        item.order.isDiscountApplied = false;
                        item.order.isSurchargeApplied = false;
                        item.order.discountAmountApplied = 0;
                        item.order.surchargeAmountAplied = 0;
                        item.order.orderStatus = interfaces_1.OrderStatus.Created;
                        return [4 /*yield*/, this._orderRepository.create(item)];
                    case 2:
                        newOrder = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newOrder)];
                }
            });
        });
    };
    OrderBusiness.prototype.updatePayment = function (processorResponse, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var orderObj, transactionDate, user, additionalInfo, updateObj, service, settlement, additionalInfo, additionalInfo, additionalInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(processorResponse);
                        return [4 /*yield*/, this._orderRepository.findById(orderId)];
                    case 1:
                        orderObj = _a.sent();
                        if (!orderObj)
                            return [2 /*return*/, Result_1.Result.fail(404, "Order not found")];
                        if (orderObj.order.orderStatus === interfaces_1.OrderStatus.Successful)
                            return [2 /*return*/, Result_1.Result.fail(404, "Order has already been completed")];
                        transactionDate = processorResponse !== null
                            ? new Date(processorResponse.gatewayReponse).getTime()
                            : 0;
                        if (date_fns_1.isPast(transactionDate))
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid transaction")];
                        if (processorResponse.amount !== processorResponse.requestedAmount)
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid transaction amount")];
                        return [4 /*yield*/, this._userRepository.findByCriteria({
                                email: processorResponse.customerId,
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "Customer not found")];
                        if (user._id.toString() != orderObj.order.user.toString())
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid customer transaction")];
                        orderObj.referencenNo = processorResponse.reference;
                        if (!processorResponse.requestStatus) return [3 /*break*/, 11];
                        if (!(PaymentFactory_1.PaymentProcessorStatus[processorResponse.status] ===
                            PaymentFactory_1.PaymentProcessorStatus.success)) return [3 /*break*/, 8];
                        if (!(processorResponse.amount === orderObj.order.totalAmount)) return [3 /*break*/, 5];
                        additionalInfo = {
                            additionalInfo: processorResponse.gatewayReponse,
                            channel: processorResponse.channel,
                            ipAddress: processorResponse.ipAddress,
                        };
                        orderObj.additionalInfo = JSON.stringify(additionalInfo);
                        orderObj.order.orderStatus = interfaces_1.OrderStatus.Successful;
                        orderObj.order.paymentDate = processorResponse.transactionDate;
                        orderObj.updateAt = new Date();
                        return [4 /*yield*/, this._orderRepository.update(orderObj._id, orderObj)];
                    case 3:
                        updateObj = _a.sent();
                        return [4 /*yield*/, this._serviceRepository.findById(orderObj.service)];
                    case 4:
                        service = _a.sent();
                        settlement = settlementHandler_1.SettlementHandler.initialize();
                        settlement.process(orderObj.order.items[0], service.type);
                        // settlement ends here
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                    case 5:
                        additionalInfo = {
                            additionalInfo: processorResponse.gatewayReponse,
                            channel: processorResponse.channel,
                            ipAddress: processorResponse.ipAddress,
                        };
                        orderObj.additionalInfo = JSON.stringify(additionalInfo);
                        orderObj.order.orderStatus = interfaces_1.OrderStatus.Failed;
                        orderObj.order.paymentDate = processorResponse.transactionDate;
                        orderObj.order.error = "Invalid amount paid";
                        orderObj.updateAt = new Date();
                        return [4 /*yield*/, this._orderRepository.update(orderObj._id, orderObj)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.fail(400, "Invalid amount paid")];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        additionalInfo = {
                            additionalInfo: processorResponse.gatewayReponse,
                            channel: processorResponse.channel,
                            ipAddress: processorResponse.ipAddress,
                        };
                        orderObj.additionalInfo = JSON.stringify(additionalInfo);
                        orderObj.order.orderStatus = interfaces_1.OrderStatus.Failed;
                        orderObj.order.paymentDate = processorResponse.transactionDate;
                        orderObj.order.error = processorResponse.gatewayReponse;
                        orderObj.updateAt = new Date();
                        return [4 /*yield*/, this._orderRepository.update(orderObj._id, orderObj)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.fail(400, processorResponse.gatewayReponse)];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        additionalInfo = {
                            additionalInfo: processorResponse.gatewayReponse,
                        };
                        orderObj.additionalInfo = JSON.stringify(additionalInfo);
                        orderObj.order.orderStatus = interfaces_1.OrderStatus.Failed;
                        orderObj.order.paymentDate = processorResponse.transactionDate;
                        orderObj.order.error = processorResponse.gatewayReponse;
                        orderObj.updateAt = new Date();
                        return [4 /*yield*/, this._orderRepository.update(orderObj._id, orderObj)];
                    case 12:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.fail(400, "Payment failed")];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    OrderBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var order, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._orderRepository.findById(id)];
                    case 1:
                        order = _a.sent();
                        if (!order)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update order.Order with Id " + id + " not found")];
                        return [4 /*yield*/, this._orderRepository.update(order._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    OrderBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._orderRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return OrderBusiness;
}());
Object.seal(OrderBusiness);
module.exports = OrderBusiness;
//# sourceMappingURL=OrderBusiness.js.map