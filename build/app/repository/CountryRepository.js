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
var Country_1 = __importDefault(require("../data/schema/Country"));
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var CountryRepository = /** @class */ (function (_super) {
    __extends(CountryRepository, _super);
    function CountryRepository() {
        return _super.call(this, Country_1.default) || this;
    }
    return CountryRepository;
}(RepositoryBase_1.default));
Object.seal(CountryRepository);
module.exports = CountryRepository;
//# sourceMappingURL=CountryRepository.js.map