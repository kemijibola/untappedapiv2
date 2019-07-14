"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var applicationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    dbHost: { type: String, required: true },
    dbName: { type: String, required: true },
    dbUser: { type: String, required: true },
    dbPassword: { type: String, required: true },
    country: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Country' },
    identity: { type: String, required: true },
    isActive: { type: String, default: false }
}, { timestamps: true });
exports.ApplicationSchema = mongooseConnection.model('Application', applicationSchema);
//# sourceMappingURL=Application.js.map