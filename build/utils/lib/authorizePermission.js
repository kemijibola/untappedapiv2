"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../error");
function authorizePermission(policies) {
    return function (req, res, next) {
        if (policies.length > 0) {
            var userPermissions = req.user.permissions.slice();
            var found = false;
            for (var i = 0; i < userPermissions.length; i++) {
                if (policies.includes(userPermissions[i])) {
                    found = true;
                }
            }
            if (!found) {
                return next(error_1.PlatformError.error({
                    code: 403,
                    message: ' You are not authorized.'
                }));
            }
        }
        next();
    };
}
exports.authorizePermission = authorizePermission;
//# sourceMappingURL=authorizePermission.js.map