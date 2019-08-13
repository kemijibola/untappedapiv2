import { ITalent } from '../../../app/models/interfaces';
import { Summary } from './Summary';

export type MatchData = ITalent;

export function generateTalentReport(data: MatchData[]): void {
  // generate and save most tap analysis
  const mostTapSummary = Summary.mostTapAnalysisReport();
  mostTapSummary.buildAndProcessReport(data);

  // generate and save highest comment analysis
  const highestCommentSummary = Summary.highestCommentAnalysisReport();
  highestCommentSummary.buildAndProcessReport(data);

  // generate and save most viewed videos
  const mostWatchedVideoSummary = Summary.mostWatchedVideoAnalysisReport();
  mostWatchedVideoSummary.buildAndProcessReport(data);
}
