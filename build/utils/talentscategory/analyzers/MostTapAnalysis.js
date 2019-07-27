"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../../../app/models/interfaces");
var MostTapAnalysis = /** @class */ (function () {
    function MostTapAnalysis() {
    }
    MostTapAnalysis.prototype.run = function (talents) {
        var sortedCategory = {
            result: [],
            categoryType: interfaces_1.ReportType.MostTaps
        };
        talents = talents.sort(function (a, b) {
            return b.tapCount - a.tapCount;
        });
        for (var _i = 0, talents_1 = talents; _i < talents_1.length; _i++) {
            var talent = talents_1[_i];
            var filtered = {
                userId: talent.user,
                stageName: talent.stageName,
                profileImage: talent.profileImagePath || '',
                shortBio: talent.shortBio
            };
            sortedCategory.result = sortedCategory.result.concat([filtered]);
        }
        return sortedCategory;
    };
    return MostTapAnalysis;
}());
exports.MostTapAnalysis = MostTapAnalysis;
//# sourceMappingURL=MostTapAnalysis.js.map