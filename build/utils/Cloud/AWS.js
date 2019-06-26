"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const AwsStorage_1 = require("./AwsStorage");
class AWS extends Model_1.Model {
    static setUpCloud(config) {
        return new AWS(new AwsStorage_1.AwsStorage(config));
    }
}
exports.AWS = AWS;
