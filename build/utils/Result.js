"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Result = /** @class */ (function () {
    function Result(result) {
        if (result.isSuccessful && result.error) {
            throw new Error("InvalidOperation: A result cannot be \n      successful and contain an error");
        }
        if (!result.isSuccessful && !result.error) {
            throw new Error("InvalidOperation: A failing result \n      needs to contain an error message");
        }
        Object.seal(this);
    }
    Result.ok = function (responseCode, value) {
        return new Result({
            isSuccessful: true,
            responseCode: responseCode,
            data: value
        });
    };
    Result.fail = function (responseCode, error) {
        return new Result({
            isSuccessful: false,
            responseCode: responseCode,
            error: error
        });
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=Result.js.map