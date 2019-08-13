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
var AbstractServer_1 = require("./AbstractServer");
var ContestListEvent;
(function (ContestListEvent) {
    ContestListEvent["CONTESTLIST"] = "contestlist";
})(ContestListEvent = exports.ContestListEvent || (exports.ContestListEvent = {}));
var ContestListServer = /** @class */ (function (_super) {
    __extends(ContestListServer, _super);
    function ContestListServer(param) {
        var _this = _super.call(this) || this;
        _this.message = ContestListEvent.CONTESTLIST;
        _this.data = param;
        return _this;
    }
    ContestListServer.emitContestList = function (data) {
        return new ContestListServer(data);
    };
    return ContestListServer;
}(AbstractServer_1.AbstractServer));
exports.ContestListServer = ContestListServer;
// const c = ContestListServer.emitContestList([]);
//# sourceMappingURL=ContestListServer.js.map