"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketEventEmitter_1 = require("./socket/SocketEventEmitter");
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.consume = function () {
        var io = null;
        var event = SocketEventEmitter_1.SocketEventEmmitter.event();
        event.on('socket', function (io) {
            io = io;
        });
        return io;
    };
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=Test.js.map