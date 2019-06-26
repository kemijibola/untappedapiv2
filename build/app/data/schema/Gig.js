"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class GigSchema {
    static get schema() {
        const schema = mongoose.Schema({
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            receiver: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            note: { type: String },
            items: [{ type: String }],
            deletedBySender: { type: Boolean, default: false },
            deletedByReciver: { type: Boolean, default: false }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('Gig', GigSchema.schema);
module.exports = schema;
