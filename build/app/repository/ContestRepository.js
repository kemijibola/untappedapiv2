"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Contest_1 = __importDefault(require("../data/schema/Contest"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class ContestRepository extends RepositoryBase_1.default {
    constructor() {
        super(Contest_1.default);
    }
}
Object.seal(ContestRepository);
module.exports = ContestRepository;
