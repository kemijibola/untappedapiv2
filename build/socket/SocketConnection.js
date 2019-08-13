"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var SocketConnection = /** @class */ (function () {
    function SocketConnection(app) {
        this.app = app;
    }
    SocketConnection.connect = function () {
        if (this.io) {
            return this.io;
        }
        this.server = http_1.createServer(this.app);
        this.io = socket_io_1.default(this.server);
    };
    return SocketConnection;
}());
//# sourceMappingURL=SocketConnection.js.map