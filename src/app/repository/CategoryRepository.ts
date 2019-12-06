import { ICategory } from "../models/interfaces";
import { CategorySchema } from "../data/schema/Category";
import RepositoryBase from "./base/RepositoryBase";

class CategoryRepository extends RepositoryBase<ICategory> {
  constructor() {
    super(CategorySchema);
  }
}

Object.seal(CategoryRepository);
export = CategoryRepository;
