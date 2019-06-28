"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('../../config/keys');
const ResourceRepository_1 = __importDefault(require("../../app/repository/ResourceRepository"));
const ResourcePermissionRepository = require("../../app/repository/ResourcePermissionRepository");
let chunkedUserPermissons = {};
exports.getPrivateKey = (keyId) => {
    return config.RSA_PRIVATE_KEY[keyId].replace(/\\n/g, '\n');
};
function tokenExchange(exchangeParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const resourceRepository = new ResourceRepository_1.default();
        const resourcePermissionRepository = new ResourcePermissionRepository();
        const resourceModel = yield resourceRepository.findByName(exchangeParams.destinationUrl);
        for (let role of exchangeParams.roles) {
            const resourcePermissionModel = yield resourcePermissionRepository.findPermissionsByRole(role, resourceModel._id);
            chunckPermission(resourcePermissionModel.permissions);
        }
        return chunkedUserPermissons;
    });
}
exports.tokenExchange = tokenExchange;
function chunckPermission(permissions) {
    for (let item of permissions) {
        if (!chunkedUserPermissons[item.name]) {
            chunkedUserPermissons[item.name] = item.name;
        }
    }
}
