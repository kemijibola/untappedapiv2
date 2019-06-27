"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Evaluation_1 = __importDefault(require("../data/schema/Evaluation"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class EvauationRepository extends RepositoryBase_1.default {
    constructor() {
        super(Evaluation_1.default);
    }
}
Object.seal(EvauationRepository);
module.exports = EvauationRepository;
