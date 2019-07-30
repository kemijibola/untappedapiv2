"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.CategorySchema = mongooseConnection.model('Category', categorySchema);
//# sourceMappingURL=Category.js.map