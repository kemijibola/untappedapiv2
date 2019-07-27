"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Summary_1 = require("./Summary");
function generateTalentReport(data) {
    // generate and save most tap analysis
    var mostTapSummary = Summary_1.Summary.mostTapAnalysisReport();
    mostTapSummary.buildAndProcessReport(data);
    // generate and save highest comment analysis
    var highestCommentSummary = Summary_1.Summary.highestCommentAnalysisReport();
    highestCommentSummary.buildAndProcessReport(data);
    // generate and save most viewed videos
    var mostWatchedVideoSummary = Summary_1.Summary.mostWatchedVideoAnalysisReport();
    mostWatchedVideoSummary.buildAndProcessReport(data);
}
exports.generateTalentReport = generateTalentReport;
//# sourceMappingURL=MatchData.js.map