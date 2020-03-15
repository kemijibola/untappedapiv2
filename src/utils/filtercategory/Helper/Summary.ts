import { IUserFilterCategory } from "../../../app/models/interfaces/UserFilterCategory";
import { MatchData } from "./MatchData";
import { MostTapAnalysis } from "../analyzers/MostTapAnalysis";
import { HighestCommentAnalysis } from "../analyzers/HighestCommentAnalysis";
import { DatabaseReport } from "../reportTarget/DatabaseReport";
import {
  UserListViewModel,
  UserListRequest
} from "../../../app/models/viewmodels";
import { AccountStatus } from "../../../app/models/interfaces";
import { AllTalentsAnalysis } from "../analyzers/AllTalentsAnalysis";
import { AllProfessionalAnalysis } from "../analyzers/AllProfessionalAnalysis";

export interface Analyzer {
  run(users: UserListViewModel[]): Promise<IUserFilterCategory[]>;
}

export interface OutputTarget {
  save(filtered: IUserFilterCategory[]): Promise<any>;
}

export class Summary {
  constructor(public analyzer: Analyzer, public output: OutputTarget) {}

  static allTalentsAnalysisReport(): Summary {
    return new Summary(new AllTalentsAnalysis(), new DatabaseReport());
  }

  static highestCommentAnalysis(): Summary {
    return new Summary(new HighestCommentAnalysis(), new DatabaseReport());
  }

  async buildReport(data: MatchData[]) {
    const analyzed = await this.analyzer.run(data);
    await this.saveReport(analyzed);
  }

  async saveReport(report: IUserFilterCategory[]) {
    await this.output.save(report);
  }
}
