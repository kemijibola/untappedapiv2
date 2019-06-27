"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Role_1 = __importDefault(require("../data/schema/Role"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class RoleRepository extends RepositoryBase_1.default {
    constructor() {
        super(Role_1.default);
    }
}
Object.seal(RoleRepository);
module.exports = RoleRepository;
