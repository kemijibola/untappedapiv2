import { Summary } from "./Summary";
import { UserListViewModel } from "../../../app/models/viewmodels";

export type MatchData = UserListViewModel;

export function generateTalentReport(data: MatchData[]): void {
  // generate and save most tap analysis
  // const mostTapSummary = Summary.mostTapAnalysisReport();
  // mostTapSummary.buildAndProcessReport(data);

  // generate and save highest comment analysis
  // const highestCommentSummary = Summary.highestCommentAnalysisReport();
  // highestCommentSummary.buildAndProWcessReport(data);

  // generate and save all talents videos
  const allTalentsSummary = Summary.allTalentsAnalysisReport();
  allTalentsSummary.buildReport(data);
  allTalentsSummary.saveReport();
}

export function generateProfessionalReport(data: MatchData[]): void {
  // const allProfessionalSummary = Summary.allProfessionalAnalysisReport();
  // allProfessionalSummary.buildAndProcessReport(data);
}
