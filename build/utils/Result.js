"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Result = /** @class */ (function () {
    function Result(responseCode, isSuccessful, data, error) {
        this.responseCode = responseCode;
        this.isSuccessful = isSuccessful;
        this.data = data;
        this.error = error;
        if (isSuccessful && error) {
            throw new Error("InvalidOperation: A result cannot be \n      successful and contain an error");
        }
        if (!isSuccessful && !error) {
            throw new Error("InvalidOperation: A failing result \n      needs to contain an error message");
        }
        Object.seal(this);
    }
    Result.ok = function (responseCode, value) {
        return new Result(responseCode, true, value);
    };
    Result.fail = function (responseCode, error) {
        return new Result(responseCode, false, undefined, error);
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=Result.js.map