"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.send({ error: 'Change to error handler' });
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.send({ error: 'Change to error handler' });
                return;
            }
        }
        next();
    };
}
exports.requestValidators = requestValidators;
//# sourceMappingURL=requestValidator.js.map