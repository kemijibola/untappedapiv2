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
var UserFilterCategory_1 = require("../data/schema/UserFilterCategory");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var UserFilterCategoryRepository = /** @class */ (function (_super) {
    __extends(UserFilterCategoryRepository, _super);
    function UserFilterCategoryRepository() {
        return _super.call(this, UserFilterCategory_1.UserFilterCategorySchema) || this;
    }
    return UserFilterCategoryRepository;
}(RepositoryBase_1.default));
Object.seal(UserFilterCategoryRepository);
module.exports = UserFilterCategoryRepository;
//# sourceMappingURL=UserFilterCategoryRepository.js.map