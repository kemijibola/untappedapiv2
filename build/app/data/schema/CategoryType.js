"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var categoryTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true });
exports.CategoryTypeSchema = mongooseConnection.model("CategoryType", categoryTypeSchema);
//# sourceMappingURL=CategoryType.js.map