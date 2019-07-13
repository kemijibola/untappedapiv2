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
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalError_1 = require("./GlobalError");
var PlatformError = /** @class */ (function (_super) {
    __extends(PlatformError, _super);
    function PlatformError(error) {
        var _this = _super.call(this, error) || this;
        _this.error = error;
        return _this;
    }
    PlatformError.error = function (error) {
        return new PlatformError(error);
    };
    return PlatformError;
}(GlobalError_1.GlobalError));
exports.PlatformError = PlatformError;
//# sourceMappingURL=ApplicationError.js.map