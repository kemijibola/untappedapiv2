"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Country_1 = __importDefault(require("../data/schema/Country"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class CountryRepository extends RepositoryBase_1.default {
    constructor() {
        super(Country_1.default);
    }
}
Object.seal(CountryRepository);
module.exports = CountryRepository;
