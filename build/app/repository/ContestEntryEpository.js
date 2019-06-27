"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ContestEntry_1 = __importDefault(require("../data/schema/ContestEntry"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class ContestEntryRepository extends RepositoryBase_1.default {
    constructor() {
        super(ContestEntry_1.default);
    }
}
Object.seal(ContestEntryRepository);
module.exports = ContestEntryRepository;
