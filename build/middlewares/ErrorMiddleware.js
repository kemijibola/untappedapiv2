"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    var status = err.code;
    var message = err.message;
    return res.json({
        status: status,
        error: message,
        data: null
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorMiddleware.js.map