"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../../../app/models/interfaces");
var TalentPortfolio_1 = require("../TalentPortfolio");
var MostWatchedVideoAnalysis = /** @class */ (function () {
    function MostWatchedVideoAnalysis() {
    }
    MostWatchedVideoAnalysis.prototype.run = function (talents) {
        var sortedCategory = {
            result: [],
            categoryType: interfaces_1.FilterCategory.MostTaps
        };
        var talentsVideo = talents.reduce(function (acc, theItem) {
            TalentPortfolio_1.fetchTalentVideos(theItem._id).then(function (data) {
                acc.push({
                    medias: data,
                    talent: theItem
                });
            });
            return acc;
        }, []);
        // fetch talent's video watch
        var talentsVideoComment = [];
        for (var _i = 0, talentsVideo_1 = talentsVideo; _i < talentsVideo_1.length; _i++) {
            var talentVideo = talentsVideo_1[_i];
            for (var _a = 0, _b = talentVideo.medias; _a < _b.length; _a++) {
                var video = _b[_a];
                talentsVideoComment.push({
                    count: video.videoPlayCount,
                    talent: talentVideo.talent
                });
            }
        }
        talentsVideoComment = talentsVideoComment.sort(function (a, b) {
            return b.count - a.count;
        });
        for (var _c = 0, talentsVideoComment_1 = talentsVideoComment; _c < talentsVideoComment_1.length; _c++) {
            var talentVideoComment = talentsVideoComment_1[_c];
            var filtered = {
                userId: talentVideoComment.talent._id,
                stageName: talentVideoComment.talent.stageName,
                profileImage: talentVideoComment.talent.profileImagePath || '',
                shortBio: talentVideoComment.talent.shortBio
            };
            sortedCategory.result = sortedCategory.result.concat([filtered]);
        }
        return sortedCategory;
    };
    return MostWatchedVideoAnalysis;
}());
exports.MostWatchedVideoAnalysis = MostWatchedVideoAnalysis;
//# sourceMappingURL=MostWatchedVideoAnalysis.js.map