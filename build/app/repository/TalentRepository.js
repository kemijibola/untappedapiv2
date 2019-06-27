"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Talent_1 = __importDefault(require("../data/schema/Talent"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class TalentRepository extends RepositoryBase_1.default {
    constructor() {
        super(Talent_1.default);
    }
}
Object.seal(TalentRepository);
module.exports = TalentRepository;
