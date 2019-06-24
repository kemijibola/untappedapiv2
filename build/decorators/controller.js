"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AppRouter_1 = require("../AppRouter");
const MetadataKeys_1 = require("../interfaces/MetadataKeys");
const requestValidator_1 = require("../utils/lib/requestValidator");
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance;
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            const requiredProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) ||
                [];
            const requestType = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.requesttype, target.prototype, key) ||
                '';
            const validator = requestValidator_1.requestValidators(requestType, requiredProps);
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        }
    };
}
exports.controller = controller;
