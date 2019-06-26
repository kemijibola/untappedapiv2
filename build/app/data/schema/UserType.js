"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class UserTypeSchema {
    static get schema() {
        const schema = mongoose.Schema({
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
