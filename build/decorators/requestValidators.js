"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const MetadataKeys_1 = require("../app/models/interfaces/custom/MetadataKeys");
function requestValidators(requestType, ...keys) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validator, keys, target, key);
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.requesttype, requestType, target, key);
    };
}
exports.requestValidators = requestValidators;
