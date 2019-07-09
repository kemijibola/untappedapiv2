"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var ResourcePermission = /** @class */ (function () {
    function ResourcePermission() {
    }
    ResourcePermission.prototype.create = function (req, res, next) { };
    ResourcePermission.prototype.update = function () { };
    ResourcePermission.prototype.delete = function () { };
    ResourcePermission.prototype.fetch = function () { };
    ResourcePermission.prototype.findById = function () { };
    __decorate([
        decorators_1.post('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], ResourcePermission.prototype, "create", null);
    ResourcePermission = __decorate([
        decorators_1.controller('/resource-permissions')
    ], ResourcePermission);
    return ResourcePermission;
}());
//# sourceMappingURL=ResourcePermission.js.map