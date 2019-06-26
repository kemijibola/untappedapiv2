"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class ResourcePermissionSchema {
    static get schema() {
        const schema = mongoose.Schema({
            resource: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Resource',
                required: true
            },
            role: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
                required: true
            },
            permissions: [
                {
                    type: mongoose.Schema.Types.ObjectId,
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
