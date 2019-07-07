"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var evaluationSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, { timestamps: true });
exports.EvaluationSchema = mongooseConnection.model('Evaluation', evaluationSchema);
//# sourceMappingURL=Evaluation.js.map