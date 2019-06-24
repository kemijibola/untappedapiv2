"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFound {
    constructor(message, code) {
        this.message = message || 'Record not found.';
        this.code = code || 404;
    }
}
exports.NotFound = NotFound;
class InvalidContent {
    constructor(message, code) {
        this.message = message || 'Provide valid json data.';
        this.code = code || 400;
    }
}
exports.InvalidContent = InvalidContent;
class InvalidCredentials {
    constructor(message, code) {
        this.message = message || 'Invalid credentials';
        this.code = code || 400;
    }
}
exports.InvalidCredentials = InvalidCredentials;
class RecordExists {
    constructor(message, code) {
        this.message = message || 'Record exists in database.';
        this.code = code || 400;
    }
}
exports.RecordExists = RecordExists;
class FetchRecordFailed {
    constructor(message, code) {
        this.message =
            message || 'Unable to fetch record at this time. Please try again later.';
        this.code = code || 400;
    }
}
exports.FetchRecordFailed = FetchRecordFailed;
class FetchRecordsFailed {
    constructor(message, code) {
        this.message =
            message ||
                'Unable to fetchs records at this time. Please try again later.';
        this.code = code || 400;
    }
}
exports.FetchRecordsFailed = FetchRecordsFailed;
