"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("../../interfaces/Request");
function requestValidators(requesType, keys) {
    return function (req, res, next) {
        switch (requesType) {
            case Request_1.RequestType.BODY:
                if (!req.body) {
                    res.send({ error: 'Change to error handler' });
                    return;
                }
                for (let key of keys) {
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
                for (let key of keys) {
                    if (!req.body[key]) {
                        res.send({ error: 'Change to error handler' });
                        return;
                    }
                }
                next();
                break;
            default:
                break;
        }
    };
}
exports.requestValidators = requestValidators;
