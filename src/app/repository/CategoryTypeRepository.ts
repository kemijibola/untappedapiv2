import { ICategoryType } from "../models/interfaces";
import { CategoryTypeSchema } from "../data/schema/CategoryType";
import RepositoryBase from "./base/RepositoryBase";

class CategoryTypeRepository extends RepositoryBase<ICategoryType> {
  constructor() {
    super(CategoryTypeSchema);
  }
}

Object.seal(CategoryTypeRepository);
export = CategoryTypeRepository;
