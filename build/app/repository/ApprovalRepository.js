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
var Approvals_1 = require("../data/schema/Approvals");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var AprovalRepository = /** @class */ (function (_super) {
    __extends(AprovalRepository, _super);
    function AprovalRepository() {
        return _super.call(this, Approvals_1.ApprovalSchema) || this;
    }
    return AprovalRepository;
}(RepositoryBase_1.default));
Object.seal(AprovalRepository);
module.exports = AprovalRepository;
//# sourceMappingURL=ApprovalRepository.js.map