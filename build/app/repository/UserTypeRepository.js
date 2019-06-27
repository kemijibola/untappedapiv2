"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserType_1 = __importDefault(require("../data/schema/UserType"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class UserTypeRepository extends RepositoryBase_1.default {
    constructor() {
        super(UserType_1.default);
    }
}
Object.seal(UserTypeRepository);
module.exports = UserTypeRepository;
