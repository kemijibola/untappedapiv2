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
var RecordNotFound = /** @class */ (function (_super) {
    __extends(RecordNotFound, _super);
    function RecordNotFound(message, code) {
        var _this = _super.call(this, { message: message, code: code }) || this;
        _this.message = message;
        _this.code = code;
        return _this;
    }
    return RecordNotFound;
}(GlobalError_1.GlobalError));
exports.RecordNotFound = RecordNotFound;
var InvalidContent = /** @class */ (function (_super) {
    __extends(InvalidContent, _super);
    function InvalidContent(message, code) {
        var _this = _super.call(this, { message: message, code: code }) || this;
        _this.message = message;
        _this.code = code;
        return _this;
    }
    return InvalidContent;
}(GlobalError_1.GlobalError));
exports.InvalidContent = InvalidContent;
var InvalidCredentials = /** @class */ (function (_super) {
    __extends(InvalidCredentials, _super);
    function InvalidCredentials(message, code) {
        return _super.call(this, { message: message, code: code }) || this;
    }
    return InvalidCredentials;
}(GlobalError_1.GlobalError));
exports.InvalidCredentials = InvalidCredentials;
var RecordExists = /** @class */ (function (_super) {
    __extends(RecordExists, _super);
    function RecordExists(message, code) {
        return _super.call(this, { message: message, code: code }) || this;
    }
    return RecordExists;
}(GlobalError_1.GlobalError));
exports.RecordExists = RecordExists;
var FetchRecordFailed = /** @class */ (function (_super) {
    __extends(FetchRecordFailed, _super);
    function FetchRecordFailed(message, code) {
        return _super.call(this, { message: message, code: code }) || this;
    }
    return FetchRecordFailed;
}(GlobalError_1.GlobalError));
exports.FetchRecordFailed = FetchRecordFailed;
var FetchRecordsFailed = /** @class */ (function (_super) {
    __extends(FetchRecordsFailed, _super);
    function FetchRecordsFailed(message, code) {
        return _super.call(this, { message: message, code: code }) || this;
    }
    return FetchRecordsFailed;
}(GlobalError_1.GlobalError));
exports.FetchRecordsFailed = FetchRecordsFailed;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message, code) {
        return _super.call(this, { message: message, code: code }) || this;
    }
    return InternalServerError;
}(GlobalError_1.GlobalError));
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=ApplicationError.js.map