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
var TalentFilterCategory_1 = require("../data/schema/TalentFilterCategory");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var TalentFilterCategoryRepository = /** @class */ (function (_super) {
    __extends(TalentFilterCategoryRepository, _super);
    function TalentFilterCategoryRepository() {
        return _super.call(this, TalentFilterCategory_1.TalentFilterCategorySchema) || this;
    }
    return TalentFilterCategoryRepository;
}(RepositoryBase_1.default));
Object.seal(TalentFilterCategoryRepository);
module.exports = TalentFilterCategoryRepository;
//# sourceMappingURL=TalentFilterCategoryRepository.js.map