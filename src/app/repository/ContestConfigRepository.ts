import { IContestConfig } from "../models/interfaces";
import { ContestConfigSchema } from "../data/schema/ContestConfig";
import RepositoryBase from "./base/RepositoryBase";

class ContestConfigRepository extends RepositoryBase<IContestConfig> {
  constructor() {
    super(ContestConfigSchema);
  }
}

Object.seal(ContestConfigRepository);
export = ContestConfigRepository;
