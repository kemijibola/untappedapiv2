"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class EvaluationSchema {
    static get schema() {
        const schema = mongoose.Schema({
            name: { type: String, required: true }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Evaluation', EvaluationSchema.schema);
module.exports = schema;
