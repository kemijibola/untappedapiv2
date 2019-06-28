"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const User_1 = __importDefault(require("../data/schema/User"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class UserRepository extends RepositoryBase_1.default {
    constructor() {
        super(User_1.default);
        this._userModel = User_1.default;
    }
    findByEmail(email) {
        const promise = new Promise((resolve, reject) => {
            this._userModel.findOne({ email: email }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
        return promise;
    }
}
Object.seal(UserRepository);
module.exports = UserRepository;
