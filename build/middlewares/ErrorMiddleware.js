"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    var status = err.code;
    var message = err.message;
    return res.status(status).json({
        status: status,
        message: message,
        data: null
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorMiddleware.js.map