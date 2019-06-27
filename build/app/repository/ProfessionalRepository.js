"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Professional_1 = __importDefault(require("../data/schema/Professional"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class ProfessionalRepository extends RepositoryBase_1.default {
    constructor() {
        super(Professional_1.default);
    }
}
Object.seal(ProfessionalRepository);
module.exports = ProfessionalRepository;
