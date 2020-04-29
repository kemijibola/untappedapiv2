import { IContest } from "../models/interfaces";
import { ContestSchema } from "../data/schema/Contest";
import RepositoryBase from "./base/RepositoryBase";

class ContestRepository extends RepositoryBase<IContest> {
  constructor() {
    super(ContestSchema);
  }
}

Object.seal(ContestRepository);
export = ContestRepository;
