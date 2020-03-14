"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Summary_1 = require("./Summary");
function generateTalentReport(data) {
    // generate and save most tap analysis
    // const mostTapSummary = Summary.mostTapAnalysisReport();
    // mostTapSummary.buildAndProcessReport(data);
    // generate and save highest comment analysis
    // const highestCommentSummary = Summary.highestCommentAnalysisReport();
    // highestCommentSummary.buildAndProWcessReport(data);
    // generate and save all talents videos
    var allTalentsSummary = Summary_1.Summary.allTalentsAnalysisReport();
    allTalentsSummary.buildReport(data);
    allTalentsSummary.saveReport();
}
exports.generateTalentReport = generateTalentReport;
function generateProfessionalReport(data) {
    // const allProfessionalSummary = Summary.allProfessionalAnalysisReport();
    // allProfessionalSummary.buildAndProcessReport(data);
}
exports.generateProfessionalReport = generateProfessionalReport;
//# sourceMappingURL=MatchData.js.map