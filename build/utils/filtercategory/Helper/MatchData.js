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
    // generate and save all talents videos
    var allTalentsSummary = Summary_1.Summary.allTalentsAnalysisReport();
    allTalentsSummary.buildAndProcessReport(data);
}
exports.generateTalentReport = generateTalentReport;
function generateProfessionalReport(data) {
    var allProfessionalSummary = Summary_1.Summary.allProfessionalAnalysisReport();
    allProfessionalSummary.buildAndProcessReport(data);
}
exports.generateProfessionalReport = generateProfessionalReport;
//# sourceMappingURL=MatchData.js.map