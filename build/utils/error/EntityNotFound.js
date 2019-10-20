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
var EntityNotFoundError = /** @class */ (function (_super) {
    __extends(EntityNotFoundError, _super);
    function EntityNotFoundError(error) {
        return _super.call(this, error) || this;
    }
    return EntityNotFoundError;
}(GlobalError_1.GlobalError));
exports.EntityNotFoundError = EntityNotFoundError;
//# sourceMappingURL=EntityNotFound.js.map