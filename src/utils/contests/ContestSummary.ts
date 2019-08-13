import { IContest } from '../../app/models/interfaces';
import { ContestListAnalysis } from './analyzers/ContestListAnalysis';

export interface ContestAnalyzer<T> {
  run(talents: IContest[]): Promise<T>;
}

export class ContestSummary<T> {
  constructor(public analyzer: ContestAnalyzer<T>) {}

  async generateContestListReport(data: IContest[]): Promise<T> {
    return this.analyzer.run(data);
  }
}
