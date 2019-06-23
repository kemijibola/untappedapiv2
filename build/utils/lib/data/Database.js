"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbServer = /** @class */ (function () {
    function DbServer(db) {
        this.db = db;
    }
    DbServer.prototype.createConnection = function (params) {
        this.db.connect(params);
    };
    DbServer.prototype.closeConnection = function () {
        this.db.disconnect();
    };
    return DbServer;
}());
exports.DbServer = DbServer;
