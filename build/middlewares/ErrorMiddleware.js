"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    const status = err.status;
    const message = err.message;
    res.status(status).send({
        status,
        message,
        data: null
    });
}
exports.errorHandler = errorHandler;
