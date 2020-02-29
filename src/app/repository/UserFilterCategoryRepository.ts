import { UserFilterCategorySchema } from "../data/schema/UserFilterCategory";
import RepositoryBase from "./base/RepositoryBase";
import { IUserFilterCategory } from "../models/interfaces/UserFilterCategory";

class UserFilterCategoryRepository extends RepositoryBase<IUserFilterCategory> {
  constructor() {
    super(UserFilterCategorySchema);
  }
}

Object.seal(UserFilterCategoryRepository);
export = UserFilterCategoryRepository;
