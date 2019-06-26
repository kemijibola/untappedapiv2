"use strict";
class CategoryModel {
    constructor(categoryModel) {
        this._categoryModel = categoryModel;
    }
    get name() {
        return this._categoryModel.name;
    }
}
Object.seal(CategoryModel);
module.exports = CategoryModel;
