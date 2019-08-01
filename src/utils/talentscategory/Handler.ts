import { Handler, Context, Callback } from 'aws-lambda';
import { TalentPortfolio } from './TalentPortfolio';
import { Summary } from './Helper/Summary';
import { MostTapAnalysis } from './analyzers/MostTapAnalysis';
import { HighestCommentAnalysis } from './analyzers/HighestCommentAnalysis';
import { DatabaseReport } from './reportTarget/DatabaseReport';
import { generateTalentReport } from './Helper/MatchData';

export const fetchTalentsByCategory: Handler = async (
  event: any = {},
  context: Context,
  cb: Callback
): Promise<any> => {
  try {
    // fetch talents for processing
    const talentPortfolio = TalentPortfolio.setUp('');
    const talents = await talentPortfolio.fetchTalents({});
    generateTalentReport(talents);
  } catch (err) {
    console.log(err);
  }
};
