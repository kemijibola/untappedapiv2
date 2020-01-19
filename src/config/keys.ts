import { Environment } from "../app/models/interfaces/custom/Environment";
import * as development from "./development.json";
import * as ci from "./ci.json";
import * as production from "./production.json";

let environment: string = process.env.NODE_ENV || "";

switch (environment) {
  case Environment.CI:
    Object.seal(ci);
    module.exports = ci;
    break;
  case Environment.PRODUCTION:
    Object.seal(production);
    module.exports = production;
    break;
  case Environment.STAGING:
    // Object.seal(staging);
    // module.exports = staging;
    break;
  default:
    Object.seal(development);
    module.exports = development;
    break;
}
