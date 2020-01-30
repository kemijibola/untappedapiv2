"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JwtHelper = /** @class */ (function () {
    function JwtHelper() {
    }
    JwtHelper.JwtInitializer = function () {
        return new JwtHelper();
    };
    JwtHelper.prototype.generateToken = function (payload, options, privateKey) {
        var promise = new Promise(function (resolve) {
            var result = { data: "", error: "" };
            jsonwebtoken_1.default.sign(payload, privateKey, options, function (err, token) {
                if (err) {
                    result = { error: err, data: "" };
                    resolve(result);
                }
                result = { error: "", data: token };
                resolve(result);
            });
        });
        return promise;
    };
    JwtHelper.prototype.verifyToken = function (token, publicKey, options) {
        var promise = new Promise(function (resolve) {
            var result = { data: "", error: "" };
            jsonwebtoken_1.default.verify(token, publicKey, options, function (err, decoded) {
                if (err) {
                    result = { error: err.message, data: "" };
                    resolve(result);
                }
                result = { error: "", data: decoded };
                resolve(result);
            });
        });
        return promise;
    };
    return JwtHelper;
}());
Object.seal(JwtHelper);
module.exports = JwtHelper;
//# sourceMappingURL=JwtHelper.js.map