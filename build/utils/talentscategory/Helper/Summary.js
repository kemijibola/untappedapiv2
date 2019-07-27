"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MostTapAnalysis_1 = require("../analyzers/MostTapAnalysis");
var HighestCommentAnalysis_1 = require("../analyzers/HighestCommentAnalysis");
var MostWatchedVideoAnalysis_1 = require("../analyzers/MostWatchedVideoAnalysis");
var DatabaseReport_1 = require("../reportTarget/DatabaseReport");
var Summary = /** @class */ (function () {
    function Summary(analyzer, output) {
        this.analyzer = analyzer;
        this.output = output;
    }
    Summary.mostTapAnalysisReport = function () {
        return new Summary(new MostTapAnalysis_1.MostTapAnalysis(), new DatabaseReport_1.DatabaseReport());
    };
    Summary.highestCommentAnalysisReport = function () {
        return new Summary(new HighestCommentAnalysis_1.HighestCommentAnalysis(), new DatabaseReport_1.DatabaseReport());
    };
    Summary.mostWatchedVideoAnalysisReport = function () {
        return new Summary(new MostWatchedVideoAnalysis_1.MostWatchedVideoAnalysis(), new DatabaseReport_1.DatabaseReport());
    };
    Summary.prototype.buildAndProcessReport = function (data) {
        var output = this.analyzer.run(data);
        this.output.process(output);
    };
    return Summary;
}());
exports.Summary = Summary;
//# sourceMappingURL=Summary.js.map