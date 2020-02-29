"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var UserFilterCategory_1 = require("../../models/interfaces/UserFilterCategory");
var mongooseConnection = MongodataAccess.mongooseConnection;
var filterCategorySchema = new mongoose_1.Schema({
    userId: { path: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    stageName: { type: String, required: true },
    profileImage: { type: String },
    shortBio: { type: String, required: true }
});
var talentFilterCategorySchema = new mongoose_1.Schema({
    result: [{ type: filterCategorySchema, required: true }],
    categoryType: { type: UserFilterCategory_1.ReportType, required: true },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
});
exports.TalentFilterCategorySchema = mongooseConnection.model('TalentFilterCategory', talentFilterCategorySchema);
//# sourceMappingURL=TalentFilterCategory.js.map