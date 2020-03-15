"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var UserFilterCategory_1 = require("../../models/interfaces/UserFilterCategory");
var mongooseConnection = MongodataAccess.mongooseConnection;
// const filterCategorySchema = new Schema({
//   userId: { path: Schema.Types.ObjectId, ref: "User", required: true },
//   stageName: { type: String, required: true },
//   profileImage: { type: String },
//   shortBio: { type: String, required: true }
// });
var categoryTypeWithCategorySchema = new mongoose_1.Schema({
    categoryTypeId: { type: String },
    category: { type: String }
});
var userFilterCategorySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    displayPhoto: { type: String, required: true },
    displayName: { type: String, required: true },
    categoryTypes: [{ type: categoryTypeWithCategorySchema, required: true }],
    shortDescription: { type: String, required: true },
    tapCount: { type: Number, default: 0 },
    contestCount: { type: Number, default: 0 },
    reportType: { type: UserFilterCategory_1.ReportType, required: true },
    aliasName: { type: String, required: true },
    userType: { type: String, required: true },
    dateJoined: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.UserFilterCategorySchema = mongooseConnection.model("UserFilterCategory", userFilterCategorySchema);
//# sourceMappingURL=UserFilterCategory.js.map