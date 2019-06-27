"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Resource_1 = __importDefault(require("../data/schema/Resource"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class ResourceRepository extends RepositoryBase_1.default {
    constructor() {
        super(Resource_1.default);
    }
}
Object.seal(ResourceRepository);
module.exports = ResourceRepository;
