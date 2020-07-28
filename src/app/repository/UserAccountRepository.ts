import { IUserAccount } from "../models/interfaces";
import { UserAccountSchema } from "../data/schema/UserAccount";
import RepositoryBase from "./base/RepositoryBase";

class UserAccountRepository extends RepositoryBase<IUserAccount> {
  constructor() {
    super(UserAccountSchema);
  }
}

Object.seal(UserAccountRepository);
export = UserAccountRepository;
