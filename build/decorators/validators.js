"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("../interfaces/MetadataKeys");
function requestValidators(requestType) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validator, keys, target, key);
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.requesttype, requestType, target, key);
    };
}
exports.requestValidators = requestValidators;
