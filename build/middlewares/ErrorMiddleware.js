"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    var status = err.code;
    var message = err.message;
    res.json({
        status: status,
        message: message,
        data: null
    });
    // return res.status(status).json({
    //   status,
    //   message,
    //   data: null
    // });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorMiddleware.js.map