"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express = require("express");
var body_parser_1 = __importDefault(require("body-parser"));
var AppRouter_1 = require("../../AppRouter");
var ErrorMiddleware_1 = require("../ErrorMiddleware");
var MiddlewaresBase = /** @class */ (function () {
    function MiddlewaresBase() {
    }
    Object.defineProperty(MiddlewaresBase, "configuration", {
        get: function () {
            var app = express();
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use(AppRouter_1.AppRouter.getInstance);
            app.use(function (error, req, res, next) {
                ErrorMiddleware_1.errorHandler(error, req, res, next);
            });
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return MiddlewaresBase;
}());
Object.seal(MiddlewaresBase);
module.exports = MiddlewaresBase;
//# sourceMappingURL=MiddlewaresBase.js.map