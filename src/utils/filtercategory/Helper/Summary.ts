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
  run(users: UserListViewModel[]): IUserFilterCategory[];
}

export interface OutputTarget {
  process(filtered: IUserFilterCategory): void;
}

export class Summary {
  constructor(public analyzer: Analyzer, public output: OutputTarget) {}

  static mostTapAnalysisReport(): Summary {
    return new Summary(new MostTapAnalysis(), new DatabaseReport());
  }

  static highestCommentAnalysisReport(): Summary {
    return new Summary(new HighestCommentAnalysis(), new DatabaseReport());
  }

  static allTalentsAnalysisReport(): Summary {
    return new Summary(new AllTalentsAnalysis(), new DatabaseReport());
  }

  static allProfessionalAnalysisReport(): Summary {
    return new Summary(new AllProfessionalAnalysis(), new DatabaseReport());
  }

  buildAndProcessReport(data: MatchData[]) {
    const sorted = this.analyzer.run(data);
    sorted.forEach(x => {
      this.output.process(x);
    });
  }
}
