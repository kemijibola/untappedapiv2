"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class UserTypeSchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true
            },
            global: {
                type: Boolean,
                required: true,
                default: false
            },
            description: {
                type: String,
                required: true
            }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('UserType', UserTypeSchema.schema);
module.exports = schema;
