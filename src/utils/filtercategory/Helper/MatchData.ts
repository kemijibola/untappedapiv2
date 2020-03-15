import { Summary } from "./Summary";
import {
  UserListViewModel,
  Talent,
  Professional
} from "../../../app/models/viewmodels";

export type MatchData = UserListViewModel;

export function generateTalentReport(data: Talent[]): void {
  // generate and save most tap analysis
  // const mostTapSummary = Summary.mostTapAnalysisReport();
  // mostTapSummary.buildAndProcessReport(data);

  // generate and save highest comment analysis
  const highestCommentSummary = Summary.highestCommentAnalysis();
  highestCommentSummary.buildReport(data);

  // generate and save all talents videos
  // const allTalentsSummary = Summary.allTalentsAnalysisReport();
  // allTalentsSummary.buildReport(data);
}

export function generateProfessionalReport(data: Professional[]): void {
  // const allProfessionalSummary = Summary.allProfessionalAnalysisReport();
  // allProfessionalSummary.buildAndProcessReport(data);
}
