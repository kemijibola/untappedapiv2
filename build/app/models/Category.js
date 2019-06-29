"use strict";
var CategoryModel = /** @class */ (function () {
    function CategoryModel(categoryModel) {
        this._categoryModel = categoryModel;
    }
    Object.defineProperty(CategoryModel.prototype, "name", {
        get: function () {
            return this._categoryModel.name;
        },
        enumerable: true,
        configurable: true
    });
    return CategoryModel;
}());
Object.seal(CategoryModel);
module.exports = CategoryModel;
//# sourceMappingURL=Category.js.map