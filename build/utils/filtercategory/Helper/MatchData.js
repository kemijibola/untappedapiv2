"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Summary_1 = require("./Summary");
function generateTalentReport(data) {
    // generate and save most tap analysis
    // const mostTapSummary = Summary.mostTapAnalysisReport();
    // mostTapSummary.buildAndProcessReport(data);
    // generate and save highest comment analysis
    var highestCommentSummary = Summary_1.Summary.highestCommentAnalysis();
    highestCommentSummary.buildReport(data);
    // generate and save all talents videos
    // const allTalentsSummary = Summary.allTalentsAnalysisReport();
    // allTalentsSummary.buildReport(data);
}
exports.generateTalentReport = generateTalentReport;
function generateProfessionalReport(data) {
    // const allProfessionalSummary = Summary.allProfessionalAnalysisReport();
    // allProfessionalSummary.buildAndProcessReport(data);
}
exports.generateProfessionalReport = generateProfessionalReport;
//# sourceMappingURL=MatchData.js.map