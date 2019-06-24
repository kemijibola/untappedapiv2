"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DbServer {
    constructor(db) {
        this.db = db;
    }
    createConnection(params) {
        this.db.connect(params);
    }
    closeConnection() {
        this.db.disconnect();
    }
}
exports.DbServer = DbServer;
