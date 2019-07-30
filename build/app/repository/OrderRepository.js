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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Order_1 = require("../data/schema/Order");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var OrderRepository = /** @class */ (function (_super) {
    __extends(OrderRepository, _super);
    function OrderRepository() {
        return _super.call(this, Order_1.OrderSchema) || this;
    }
    return OrderRepository;
}(RepositoryBase_1.default));
Object.seal(OrderRepository);
module.exports = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map