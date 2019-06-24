"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sample(req, res, next) {
    console.log('Request was made');
    next();
}
exports.sample = sample;
