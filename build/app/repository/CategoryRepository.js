"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Category_1 = __importDefault(require("../data/schema/Category"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class CategoryRepository extends RepositoryBase_1.default {
    constructor() {
        super(Category_1.default);
    }
}
Object.seal(CategoryRepository);
module.exports = CategoryRepository;
