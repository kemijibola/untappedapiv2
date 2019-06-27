"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Gig_1 = __importDefault(require("../data/schema/Gig"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class GigRepository extends RepositoryBase_1.default {
    constructor() {
        super(Gig_1.default);
    }
}
Object.seal(GigRepository);
module.exports = GigRepository;
