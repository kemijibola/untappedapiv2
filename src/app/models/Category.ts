import { ICategory } from './interfaces';

class CategoryModel {
  private _categoryModel: ICategory;
  constructor(categoryModel: ICategory) {
    this._categoryModel = categoryModel;
  }

  get name(): string {
    return this._categoryModel.name;
  }
}

Object.seal(CategoryModel);
export = CategoryModel;
