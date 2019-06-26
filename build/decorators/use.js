"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const MetadataKeys_1 = require("../app/models/interfaces/custom/MetadataKeys");
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.middleware, [...middlewares, middleware], target, key);
    };
}
exports.use = use;
