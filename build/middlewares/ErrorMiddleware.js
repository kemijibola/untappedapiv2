"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    var status = err.status;
    var message = err.message;
    res.status(status).send({
        status: status,
        message: message,
        data: null
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorMiddleware.js.map