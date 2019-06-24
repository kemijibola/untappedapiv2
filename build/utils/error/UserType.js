"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserTypeNotFoundError = /** @class */ (function () {
    function UserTypeNotFoundError(message) {
        _this = _super.call(this, message || 'No User type found.', 404) || this;
    }
    return UserTypeNotFoundError;
}());
exports.UserTypeNotFoundError = UserTypeNotFoundError;
var UserTypeInvalidContent = /** @class */ (function () {
    function UserTypeInvalidContent(message) {
        _this = _super.call(this, message || 'Provide valid json data. /name/', 400) || this;
    }
    return UserTypeInvalidContent;
}());
var UserTypeExists = /** @class */ (function () {
    function UserTypeExists(message) {
        _this = _super.call(this, message || 'User type already exist', 400) || this;
    }
    return UserTypeExists;
}());
var FetchUserTypeFailed = /** @class */ (function () {
    function FetchUserTypeFailed(message) {
        _this = _super.call(this, message ||
            'Unable to fetch user type at this time. Please try again later.', 400) || this;
    }
    return FetchUserTypeFailed;
}());
var FetchUserTypesFailed = /** @class */ (function () {
    function FetchUserTypesFailed(message) {
        _this = _super.call(this, message ||
            'Unable to fetch user types at this time. Please try again later.', 400) || this;
    }
    return FetchUserTypesFailed;
}());
