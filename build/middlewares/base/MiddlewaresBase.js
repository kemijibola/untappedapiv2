"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const AppRouter_1 = require("../../AppRouter");
class MiddlewaresBase {
    static get configuration() {
        const app = express();
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(AppRouter_1.AppRouter.getInstance);
        return app;
    }
}
Object.seal(MiddlewaresBase);
module.exports = MiddlewaresBase;
