"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Portfolio_1 = __importDefault(require("../data/schema/Portfolio"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class PortfolioRepository extends RepositoryBase_1.default {
    constructor() {
        super(Portfolio_1.default);
    }
}
Object.seal(PortfolioRepository);
module.exports = PortfolioRepository;
