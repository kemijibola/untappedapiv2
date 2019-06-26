"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestType_1 = require("../../app/models/interfaces/custom/RequestType");
function requestValidators(requesType, keys) {
    return function (req, res, next) {
        switch (requesType) {
            case RequestType_1.RequestType.BODY:
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
            case RequestType_1.RequestType.PARAMS:
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
