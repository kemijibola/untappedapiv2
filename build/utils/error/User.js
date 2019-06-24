"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserNotFoundError = /** @class */ (function () {
    function UserNotFoundError(message, code) {
        this.message = message || 'No User found.';
        this.code = code || 404;
    }
    return UserNotFoundError;
}());
exports.UserNotFoundError = UserNotFoundError;
var UserInvalidContent = /** @class */ (function () {
    function UserInvalidContent(message, code) {
        this.message =
            message ||
                'Provide valid json data. /name, email, password, user_type, audience/';
        this.code = code || 400;
    }
    return UserInvalidContent;
}());
exports.UserInvalidContent = UserInvalidContent;
var InvalidCredentials = /** @class */ (function () {
    function InvalidCredentials(message, code) {
        this.message = message || 'Invalid credentials';
        this.code = code || 400;
    }
    return InvalidCredentials;
}());
exports.InvalidCredentials = InvalidCredentials;
var UserExists = /** @class */ (function () {
    function UserExists(message, code) {
        this.message = message || 'There is a user registered with this email';
        this.code = code || 400;
    }
    return UserExists;
}());
exports.UserExists = UserExists;
var FetchUserFailed = /** @class */ (function () {
    function FetchUserFailed(message, code) {
        this.message =
            message || 'Unable to fetch user at this time. Please try again later.';
        this.code = code || 400;
    }
    return FetchUserFailed;
}());
exports.FetchUserFailed = FetchUserFailed;
var FetchUsersFailed = /** @class */ (function () {
    function FetchUsersFailed(message, code) {
        this.message =
            message || 'Unable to fetchs user at this time. Please try again later.';
        this.code = code || 400;
    }
    return FetchUsersFailed;
}());
exports.FetchUsersFailed = FetchUsersFailed;
