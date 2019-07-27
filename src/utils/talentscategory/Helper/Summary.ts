import {
  IFilterCategory,
  TalentFilterCategory
} from './../../../app/models/interfaces/TalentFilterCategory';
import { MatchData } from './MatchData';
import { ITalentFilterCategory, ITalent } from '../../../app/models/interfaces';

export interface Analyzer {
  run(talents: MatchData[]): TalentFilterCategory;
}

export interface OutputTarget {
  process(report: ITalentFilterCategory): void;
}

export class Summary {
  constructor(public analyzer: Analyzer, public output: OutputTarget) {}

  buildAndProcessReport(data: MatchData[]) {}
}
