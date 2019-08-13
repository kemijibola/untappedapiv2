"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var SocketEventEmmitter = /** @class */ (function (_super) {
    __extends(SocketEventEmmitter, _super);
    function SocketEventEmmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocketEventEmmitter.event = function () {
        return new SocketEventEmmitter();
    };
    return SocketEventEmmitter;
}(events_1.EventEmitter));
exports.SocketEventEmmitter = SocketEventEmmitter;
//# sourceMappingURL=SocketEventEmitter.js.map