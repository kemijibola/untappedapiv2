"use strict";
if (process.env.node_env === 'production') {
    module.exports = require('../config/production');
}
else if (process.env.node_env === 'ci') {
    module.exports = require('../config/ci');
}
else {
    module.exports = require('../config/development');
}
