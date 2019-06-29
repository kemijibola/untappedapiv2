"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestValidators(keys) {
    return function (req, res, next) {
        // switch (requesType) {
        //   case RequestType.BODY:
        //     if (!req.body) {
        //       res.send({ error: 'Change to error handler' });
        //       return;
        //     }
        //     for (let key of keys) {
        //       if (!req.body[key]) {
        //         res.send({ error: 'Change to error handler' });
        //         return;
        //       }
        //     }
        //     next();
        //     break;
        //   case RequestType.PARAMS:
        //     if (!req.params) {
        //       res.send({ error: 'Change to error handler' });
        //       return;
        //     }
        //     for (let key of keys) {
        //       if (!req.body[key]) {
        //         res.send({ error: 'Change to error handler' });
        //         return;
        //       }
        //     }
        //     next();
        //     break;
        //   default:
        //     break;
        // }
    };
}
exports.requestValidators = requestValidators;
//# sourceMappingURL=requestValidator.js.map