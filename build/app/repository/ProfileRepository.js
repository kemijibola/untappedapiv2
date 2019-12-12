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
var Profile_1 = require("../data/schema/Profile");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var ProfileRepository = /** @class */ (function (_super) {
    __extends(ProfileRepository, _super);
    function ProfileRepository() {
        return _super.call(this, Profile_1.ProfileSchema) || this;
    }
    return ProfileRepository;
}(RepositoryBase_1.default));
Object.seal(ProfileRepository);
module.exports = ProfileRepository;
//# sourceMappingURL=ProfileRepository.js.map