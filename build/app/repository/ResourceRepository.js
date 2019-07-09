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
var Resource_1 = require("../data/schema/Resource");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var ResourceRepository = /** @class */ (function (_super) {
    __extends(ResourceRepository, _super);
    function ResourceRepository() {
        return _super.call(this, Resource_1.ResourceSchema) || this;
    }
    return ResourceRepository;
}(RepositoryBase_1.default));
Object.seal(ResourceRepository);
module.exports = ResourceRepository;
//# sourceMappingURL=ResourceRepository.js.map