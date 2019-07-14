"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var AppRouter_1 = require("../AppRouter");
var MetadataKeys_1 = require("../app/models/interfaces/custom/MetadataKeys");
var requestValidator_1 = require("../utils/lib/requestValidator");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance;
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            var requiredProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) ||
                [];
            var validator = requestValidator_1.requestValidators(requiredProps);
            if (path) {
                router[method].apply(router, ["" + routePrefix + path].concat(middlewares, [validator,
                    routeHandler]));
            }
        }
    };
}
exports.controller = controller;
//# sourceMappingURL=controller.js.map