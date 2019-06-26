"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor() {
        this.transformResponse = (res, params) => {
            res.json({
                status: params.status,
                message: params.message,
                data: params.data
            });
        };
    }
}
exports.BaseController = BaseController;
