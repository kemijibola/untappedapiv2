"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIo_1 = require("../SocketIo");
var ServerEvent;
(function (ServerEvent) {
    ServerEvent["CONNECT"] = "connect";
    ServerEvent["DISCONNECT"] = "disconnect";
})(ServerEvent = exports.ServerEvent || (exports.ServerEvent = {}));
var AbstractServer = /** @class */ (function () {
    function AbstractServer() {
        this.emitData();
    }
    AbstractServer.prototype.emitData = function () {
        var _this = this;
        var io = SocketIo_1.SocketIo.getInstance;
        io.on(ServerEvent.CONNECT, function (socket) {
            socket.on(_this.message, function () {
                console.log('[server](message): %s', JSON.stringify(_this.data));
                io.emit('message', _this.data);
            });
            socket.on(ServerEvent.DISCONNECT, function () {
                console.log('Client disconnected');
            });
        });
    };
    return AbstractServer;
}());
exports.AbstractServer = AbstractServer;
//# sourceMappingURL=AbstractServer.js.map