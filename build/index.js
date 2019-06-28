"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config = module.require('./config/keys');
const MiddlewaresBase = require("./middlewares/base/MiddlewaresBase");
require("./controllers");
const app = express_1.default();
const port = config.PORT || 5000;
app.set('port', port);
app.use(MiddlewaresBase.configuration);
app.listen(port, () => {
    console.log(`Untapped Pool app successfully started on ${port}`);
});
