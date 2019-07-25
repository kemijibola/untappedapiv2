"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var highestCommentSchema = new mongoose_1.Schema({});
exports.HighestCommentSchema = mongooseConnection.model('HighestComment', highestCommentSchema);
//# sourceMappingURL=HighestComment.js.map