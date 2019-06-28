"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class RoleSchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true
            },
            userType: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'UserType',
                required: true
            },
            roleType: {
                type: String,
                required: true
            }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Role', RoleSchema.schema);
module.exports = schema;
