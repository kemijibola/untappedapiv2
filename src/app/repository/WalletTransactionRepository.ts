import { WalletTransactionSchema } from "../data/schema/WalletTransaction";
import RepositoryBase from "./base/RepositoryBase";
import { WalletTransaction } from "../models/interfaces";

class WalletTransactionRepository extends RepositoryBase<WalletTransaction> {
  constructor() {
    super(WalletTransactionSchema);
  }
}

Object.seal(WalletTransactionRepository);
export = WalletTransactionRepository;
