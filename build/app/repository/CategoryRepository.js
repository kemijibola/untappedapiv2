"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Category_1 = require("../data/schema/Category");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var CategoryRepository = /** @class */ (function (_super) {
    __extends(CategoryRepository, _super);
    function CategoryRepository() {
        var _this = _super.call(this, Category_1.CategorySchema) || this;
        _this._categoryModel = Category_1.CategorySchema;
        return _this;
    }
    CategoryRepository.prototype.findByName = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._categoryModel.findOne({ name: name }, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    return CategoryRepository;
}(RepositoryBase_1.default));
Object.seal(CategoryRepository);
module.exports = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map