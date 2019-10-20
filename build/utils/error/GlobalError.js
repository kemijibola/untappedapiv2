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
var GlobalError = /** @class */ (function (_super) {
    __extends(GlobalError, _super);
    function GlobalError(error) {
        var _this = _super.call(this, error.message) || this;
        _this.error = error;
        _this.message = error.message;
        _this.code = error.code;
        return _this;
    }
    return GlobalError;
}(Error));
exports.GlobalError = GlobalError;
//# sourceMappingURL=GlobalError.js.map