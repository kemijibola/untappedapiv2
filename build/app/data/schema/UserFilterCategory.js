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
var userFilterCategorySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    displayPhoto: { type: String, required: true },
    displayName: { type: String, required: true },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    shortDescription: { type: String, required: true },
    reportType: { type: UserFilterCategory_1.ReportType, required: true },
    userType: { type: String, required: true }
});
exports.UserFilterCategorySchema = mongooseConnection.model("UserFilterCategory", userFilterCategorySchema);
//# sourceMappingURL=UserFilterCategory.js.map