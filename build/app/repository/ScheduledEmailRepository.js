"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ScheduledEmail_1 = __importDefault(require("../data/schema/ScheduledEmail"));
const RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
class ScheduledEmailRepository extends RepositoryBase_1.default {
    constructor() {
        super(ScheduledEmail_1.default);
    }
}
Object.seal(ScheduledEmailRepository);
module.exports = ScheduledEmailRepository;
