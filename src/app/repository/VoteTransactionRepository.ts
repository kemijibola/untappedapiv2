import { VoteTransaction } from "../models/interfaces";
import { VoteTransactionSchema } from "../data/schema/VoteTransaction";
import RepositoryBase from "./base/RepositoryBase";

class VoteTransactionRepository extends RepositoryBase<VoteTransaction> {
  constructor() {
    super(VoteTransactionSchema);
  }
}

Object.seal(VoteTransactionRepository);
export = VoteTransactionRepository;
