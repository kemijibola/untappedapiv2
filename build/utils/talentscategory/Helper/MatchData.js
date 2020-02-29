"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Summary_1 = require("./Summary");
function generateTalentReport(data) {
    // generate and save most tap analysis
    // const mostTapSummary = Summary.mostTapAnalysisReport();
    // mostTapSummary.buildAndProcessReport(data);
    // generate and save highest comment analysis
    var highestCommentSummary = Summary_1.Summary.highestCommentAnalysisReport();
    highestCommentSummary.buildAndProcessReport(data);
    // generate and save most viewed videos
    // const mostWatchedVideoSummary = Summary.mostWatchedVideoAnalysisReport();
    // mostWatchedVideoSummary.buildAndProcessReport(data);
}
exports.generateTalentReport = generateTalentReport;
function generateProfessionalReport() { }
exports.generateProfessionalReport = generateProfessionalReport;
//# sourceMappingURL=MatchData.js.map