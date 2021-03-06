"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AppRouter = /** @class */ (function () {
    function AppRouter() {
    }
    Object.defineProperty(AppRouter, "getInstance", {
        get: function () {
            if (!AppRouter.instance) {
                AppRouter.instance = express_1.default.Router();
            }
            return AppRouter.instance;
        },
        enumerable: true,
        configurable: true
    });
    return AppRouter;
}());
exports.AppRouter = AppRouter;
//# sourceMappingURL=AppRouter.js.map