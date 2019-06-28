"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class ResourcePermissionSchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
            resource: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Resource',
                required: true
            },
            role: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Role',
                required: true
            },
            permissions: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Permission',
                    required: true
                }
            ]
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('ResourcePermission', ResourcePermissionSchema.schema);
module.exports = schema;
