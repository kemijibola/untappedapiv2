"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    var status = err.code || 500;
    var message = err.message || "Something went wrong";
    res.status(status).send({
        response_code: status,
        response_message: message
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorMiddleware.js.map