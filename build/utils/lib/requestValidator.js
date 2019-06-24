"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("../../interfaces/Request");
function requestValidators(requesType, keys) {
    return function (req, res, next) {
        switch (requesType) {
            case Request_1.RequestType.BODY:
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
                break;
            case Request_1.RequestType.PARAMS:
                if (!req.params) {
                    res.send({ error: 'Change to error handler' });
                    return;
                }
                for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                    var key = keys_2[_a];
                    if (!req.body[key]) {
                        res.send({ error: 'Change to error handler' });
                        return;
                    }
                }
                break;
            default:
                break;
        }
    };
}
exports.requestValidators = requestValidators;
