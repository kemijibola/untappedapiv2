import {
  IFilterCategory,
  FilterCategory
} from './../../../app/models/interfaces/TalentFilterCategory';
import { MatchData } from './MatchData';
import { MostTapAnalysis } from '../analyzers/MostTapAnalysis';
import { HighestCommentAnalysis } from '../analyzers/HighestCommentAnalysis';
import { MostWatchedVideoAnalysis } from '../analyzers/MostWatchedVideoAnalysis';
import { DatabaseReport } from '../reportTarget/DatabaseReport';

export interface Analyzer {
  run(talents: MatchData[]): FilterCategory;
}

export interface OutputTarget {
  process(report: FilterCategory): void;
}

export class Summary {
  constructor(public analyzer: Analyzer, public output: OutputTarget) {}

  static mostTapAnalysisReport(): Summary {
    return new Summary(new MostTapAnalysis(), new DatabaseReport());
  }

  static highestCommentAnalysisReport(): Summary {
    return new Summary(new HighestCommentAnalysis(), new DatabaseReport());
  }

  static mostWatchedVideoAnalysisReport(): Summary {
    return new Summary(new MostWatchedVideoAnalysis(), new DatabaseReport());
  }

  buildAndProcessReport(data: MatchData[]): void {
    const output = this.analyzer.run(data);
    this.output.process(output);
  }
}
