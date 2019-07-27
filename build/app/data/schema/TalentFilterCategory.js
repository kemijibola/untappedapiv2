"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var TalentFilterCategory_1 = require("../../models/interfaces/TalentFilterCategory");
var mongooseConnection = MongodataAccess.mongooseConnection;
var filterCategorySchema = new mongoose_1.Schema({
    userId: { path: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    stageName: { type: String, required: true },
    profileImage: { type: String },
    shortBio: { type: String, required: true }
});
var talentFilterCategorySchema = new mongoose_1.Schema({
    result: [filterCategorySchema],
    categoryType: { type: TalentFilterCategory_1.FilterCategory, required: true }
});
exports.TalentFilterCategorySchema = mongooseConnection.model('TalentFilterCategory', talentFilterCategorySchema);
//# sourceMappingURL=TalentFilterCategory.js.map