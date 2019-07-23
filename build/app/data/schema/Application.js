"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var applicationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    dbUri: { type: String, required: true },
    country: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Country' },
    identity: { type: String, required: true },
    secret: { type: String, required: true },
    isActive: { type: Boolean, default: false }
}, { timestamps: true });
exports.ApplicationSchema = mongooseConnection.model('Application', applicationSchema);
//# sourceMappingURL=Application.js.map