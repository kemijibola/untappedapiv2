"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: interfaces_1.ServiceType,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    vat: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: false,
    },
    surchargeFee: {
        type: Number,
    },
    description: {
        type: String,
    },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.ServiceSchema = mongooseConnection.model("Service", serviceSchema);
//# sourceMappingURL=Service.js.map