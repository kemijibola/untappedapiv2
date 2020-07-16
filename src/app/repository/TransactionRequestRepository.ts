import { TransactionRequestSchema } from "../data/schema/TransactionRequest";
import RepositoryBase from "./base/RepositoryBase";
import { TransactionRequest } from "../models/interfaces/TransactionRequest";

class TransactionRequestRepository extends RepositoryBase<TransactionRequest> {
  constructor() {
    super(TransactionRequestSchema);
  }
}

Object.seal(TransactionRequestRepository);
export = TransactionRequestRepository;
