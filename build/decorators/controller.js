"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var AppRouter_1 = require("../AppRouter");
var MetadataKeys_1 = require("../app/models/interfaces/custom/MetadataKeys");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance;
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            //console.log('line 15', target.prototype[key]);
            var g = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype);
            console.log('line ', target.prototype);
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            // const requiredProps =
            //   Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
            //   [];
            // const requestType =
            //   Reflect.getMetadata(MetadataKeys.requesttype, target.prototype, key) ||
            //   '';
            //const validator = requestValidators(requiredProps);
            if (path) {
                router[method].apply(router, ["" + routePrefix + path].concat(middlewares, [
                    // validator,
                    routeHandler]));
            }
        }
    };
}
exports.controller = controller;
//# sourceMappingURL=controller.js.map