"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var refreshTokenSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    ownerId: { type: String, required: true },
    isExpired: { type: Boolean, default: false },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    }
}, { timestamps: true });
exports.RefreshTokenSchema = mongooseConnection.model("RefreshToken", refreshTokenSchema);
//# sourceMappingURL=RefreshToken.js.map