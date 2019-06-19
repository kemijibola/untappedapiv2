"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setDefaultConfig() {
    if (process.env.NODE_ENV === 'production') {
        module.exports = require('../config/production');
    }
    else if (process.env.NODE_ENV === 'ci') {
        module.exports = require('../config/ci');
    }
    else {
        console.log('setting development');
        module.exports = require('../config/development');
    }
}
exports.setDefaultConfig = setDefaultConfig;
