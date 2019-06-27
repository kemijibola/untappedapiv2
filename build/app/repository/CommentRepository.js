"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Comment_1 = __importDefault(require("../data/schema/Comment"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class CommentRepository extends RepositoryBase_1.default {
    constructor() {
        super(Comment_1.default);
    }
}
Object.seal(CommentRepository);
module.exports = CommentRepository;
