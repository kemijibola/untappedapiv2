"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = module.require('../config/keys');
function getPrivateKey(keyId) {
    return config.RSA_PRIVATE_KEY.filter(x => x.KID === keyId)[0].SECRET.replace(/\\n/g, '\n');
}
exports.getPrivateKey = getPrivateKey;
