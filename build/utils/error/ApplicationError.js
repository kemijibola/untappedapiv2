"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotFound = /** @class */ (function () {
    function NotFound(message, code) {
        this.message = message || 'Record not found.';
        this.code = code || 404;
    }
    return NotFound;
}());
exports.NotFound = NotFound;
var InvalidContent = /** @class */ (function () {
    function InvalidContent(message, code) {
        this.message = message || 'Provide valid json data.';
        this.code = code || 400;
    }
    return InvalidContent;
}());
exports.InvalidContent = InvalidContent;
var InvalidCredentials = /** @class */ (function () {
    function InvalidCredentials(message, code) {
        this.message = message || 'Invalid credentials';
        this.code = code || 400;
    }
    return InvalidCredentials;
}());
exports.InvalidCredentials = InvalidCredentials;
var RecordExists = /** @class */ (function () {
    function RecordExists(message, code) {
        this.message = message || 'Record exists in database.';
        this.code = code || 400;
    }
    return RecordExists;
}());
exports.RecordExists = RecordExists;
var FetchRecordFailed = /** @class */ (function () {
    function FetchRecordFailed(message, code) {
        this.message =
            message || 'Unable to fetch record at this time. Please try again later.';
        this.code = code || 400;
    }
    return FetchRecordFailed;
}());
exports.FetchRecordFailed = FetchRecordFailed;
var FetchRecordsFailed = /** @class */ (function () {
    function FetchRecordsFailed(message, code) {
        this.message =
            message ||
                'Unable to fetchs records at this time. Please try again later.';
        this.code = code || 400;
    }
    return FetchRecordsFailed;
}());
exports.FetchRecordsFailed = FetchRecordsFailed;
