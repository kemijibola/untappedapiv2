"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var SocketIo = /** @class */ (function () {
    function SocketIo() {
        // SocketIo.getInstance;
    }
    SocketIo.setUpApp = function (app) {
        this.server = http_1.createServer(app);
    };
    Object.defineProperty(SocketIo, "getInstance", {
        get: function () {
            if (!SocketIo.instance) {
                SocketIo.instance = socket_io_1.default(this.server);
            }
            console.log(this.instance);
            return SocketIo.instance;
        },
        enumerable: true,
        configurable: true
    });
    return SocketIo;
}());
exports.SocketIo = SocketIo;
//# sourceMappingURL=SocketIo.js.map