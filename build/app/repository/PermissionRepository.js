"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Permission_1 = __importDefault(require("../data/schema/Permission"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class PermissionRepository extends RepositoryBase_1.default {
    constructor() {
        super(Permission_1.default);
    }
}
Object.seal(PermissionRepository);
module.exports = PermissionRepository;
