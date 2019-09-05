"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var Environment_1 = require("../app/models/interfaces/custom/Environment");
var development = __importStar(require("./development.json"));
var ci = __importStar(require("./ci.json"));
var environment = process.env.NODE_ENV || '';
switch (environment) {
    case Environment_1.Environment.CI:
        Object.seal(ci);
        module.exports = ci;
        break;
    case Environment_1.Environment.PRODUCTION:
        // Object.seal(production);
        // module.exports = production;
        break;
    case Environment_1.Environment.STAGING:
        // Object.seal(staging);
        // module.exports = staging;
        break;
    default:
        Object.seal(development);
        module.exports = development;
        break;
}
//# sourceMappingURL=keys.js.map