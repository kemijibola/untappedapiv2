"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('../../config/keys');
exports.audioExtentions = [
    'mp3',
    '3gp',
    'aax',
    'wma',
    'webm',
    'wav',
    'voc',
    'mpc',
    'gsm',
    'pcm',
    'aiff',
    'aac',
    'ogg',
    'flac',
    'alac'
];
exports.videoExtensions = [
    'mp4',
    '3gp',
    'ogg',
    'wmv',
    'webm',
    'flv',
    'avi',
    'vob',
    'mpeg',
    'wav',
    'lxf'
];
exports.imageExtensions = [
    'jpeg',
    'exif',
    'tiff',
    'gif',
    'bmp',
    'png',
    'ppm',
    'webp',
    'svg',
    'bat',
    'heif',
    'bpg'
];
exports.AcceptedMedias = {
    png: 'image',
    jpeg: 'image',
    gif: 'image',
    svg: 'image',
    mp4: 'audio',
    mpeg: 'video',
    avi: 'video',
    flv: 'video',
    mp3: 'audio',
    wma: 'audio',
    '3gp': 'video'
};
function getCurrentKey() {
    var key = '';
    var keySearch = config.RSA_PRIVATE.filter(function (x) { return x.key === '42'; })[0];
    if (keySearch) {
        key = keySearch.key;
    }
    return key;
}
function getCurrentRsa() {
    var rsa = '';
    var rsaSearch = config.RSA_PRIVATE.filter(function (x) { return x.rsaAlgType === 'RS256'; })[0];
    if (rsaSearch) {
        rsa = rsaSearch.rsaAlgType;
    }
    return rsa;
}
function getIssuer() {
    return config.ISSUER.toLowerCase() || '';
}
function getAuthExpiration() {
    return config.AUTH_EXPIRESIN || '';
}
function getMailExpiration() {
    return config.MAIL_EXPIRESIN || '';
}
exports.currentKey = getCurrentKey();
exports.rsaAlgType = getCurrentRsa();
exports.issuer = getIssuer();
exports.authExpiration = getAuthExpiration();
exports.mailExpiration = getMailExpiration();
//# sourceMappingURL=Constant.js.map