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
var Role_1 = __importDefault(require("../data/schema/Role"));
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var RoleRepository = /** @class */ (function (_super) {
    __extends(RoleRepository, _super);
    function RoleRepository() {
        return _super.call(this, Role_1.default) || this;
    }
    return RoleRepository;
}(RepositoryBase_1.default));
Object.seal(RoleRepository);
module.exports = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map