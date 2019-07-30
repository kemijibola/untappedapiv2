"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var gigSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    note: { type: String },
    items: [{ type: String }],
    deletedBySender: { type: Boolean, default: false },
    deletedByReciver: { type: Boolean, default: false },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.GigSchema = mongooseConnection.model('Gig', gigSchema);
//# sourceMappingURL=Gig.js.map