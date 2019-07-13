"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('../../config/keys');
var ResourceRepository_1 = __importDefault(require("../../app/repository/ResourceRepository"));
var ResourcePermissionRepository = require("../../app/repository/ResourcePermissionRepository");
var error_1 = require("../error");
var chunkedUserPermissons = {};
exports.getPrivateKey = function (keyId) {
    return config.RSA_PRIVATE_KEYS[keyId].replace(/\\n/g, '\n');
};
function tokenExchange(exchangeParams) {
    return __awaiter(this, void 0, void 0, function () {
        var resourceRepository, resourcePermissionRepository, resourceModel, _i, _a, role, resourcePermissionModel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    resourceRepository = new ResourceRepository_1.default();
                    resourcePermissionRepository = new ResourcePermissionRepository();
                    return [4 /*yield*/, resourceRepository.findByCriteria({
                            name: exchangeParams.destinationUrl
                        })];
                case 1:
                    resourceModel = _b.sent();
                    if (!resourceModel._id)
                        throw error_1.PlatformError.error({
                            code: 404,
                            message: exchangeParams.destinationUrl + " is not a valid route"
                        });
                    _i = 0, _a = exchangeParams.roles;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    role = _a[_i];
                    return [4 /*yield*/, resourcePermissionRepository.findPermissionsByRole(role, resourceModel._id)];
                case 3:
                    resourcePermissionModel = _b.sent();
                    if (resourcePermissionModel.permissions.length < 1)
                        throw error_1.PlatformError.error({
                            code: 404,
                            message: "There are no permissions configured for route " + resourceModel.name
                        });
                    chunckPermission(resourcePermissionModel.permissions);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, chunkedUserPermissons];
            }
        });
    });
}
exports.tokenExchange = tokenExchange;
function chunckPermission(permissions) {
    for (var _i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
        var item = permissions_1[_i];
        if (!chunkedUserPermissons[item.name]) {
            chunkedUserPermissons[item.name] = item.name;
        }
    }
}
//# sourceMappingURL=Helper.js.map