"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const User_1 = __importDefault(require("../../data/schema/User"));
const RepositoryBase_1 = __importDefault(require("../base/RepositoryBase"));
class UserRepository extends RepositoryBase_1.default {
    constructor() {
        super(User_1.default);
    }
}
Object.seal(UserRepository);
module.exports = UserRepository;
