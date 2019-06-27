"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PrizeType_1 = __importDefault(require("../data/schema/PrizeType"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class PrizeTypeRepository extends RepositoryBase_1.default {
    constructor() {
        super(PrizeType_1.default);
    }
}
Object.seal(PrizeTypeRepository);
module.exports = PrizeTypeRepository;
