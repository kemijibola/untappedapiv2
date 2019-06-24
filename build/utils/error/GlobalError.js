"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlobalError extends Error {
    constructor(error) {
        super();
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = error.message;
        this.code = error.code;
    }
}
exports.GlobalError = GlobalError;
