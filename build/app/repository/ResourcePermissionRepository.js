"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ResourcePermission_1 = __importDefault(require("../data/schema/ResourcePermission"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class ResourcePermissionRepository extends RepositoryBase_1.default {
    constructor() {
        super(ResourcePermission_1.default);
    }
}
Object.seal(ResourcePermissionRepository);
module.exports = ResourcePermissionRepository;
