"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../error");
function requestValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            return next(new error_1.PlatformError({ code: 400, message: 'Invalid request' }));
        }
        var missingProps = '';
        for (var i = 0; i < keys.length; i++) {
            if (!req.body[keys[i]]) {
                missingProps += keys[i];
            }
        }
        if (missingProps) {
            return next(new error_1.PlatformError({
                code: 400,
                message: "Invalid request.Missing property '" + missingProps + "'"
            }));
        }
        next();
    };
}
exports.requestValidators = requestValidators;
//# sourceMappingURL=requestValidator.js.map