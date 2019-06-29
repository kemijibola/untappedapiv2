"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var EvaluationSchema = /** @class */ (function () {
    function EvaluationSchema() {
    }
    Object.defineProperty(EvaluationSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                name: { type: String, required: true }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return EvaluationSchema;
}());
var schema = mongooseConnection.model('Evaluation', EvaluationSchema.schema);
module.exports = schema;
//# sourceMappingURL=Evaluation.js.map