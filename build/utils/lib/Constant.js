"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("../../config/keys");
exports.AcceptedImageExt = {
    png: "image",
    jpeg: "image",
    jpg: "image",
    gif: "image",
    svg: "image",
    exif: "image",
    tiff: "image",
    bmp: "image",
    ppm: "image",
    webp: "image",
    bat: "image",
    heif: "image",
    bpg: "image",
};
exports.AcceptedAudioExt = {
    mp3: "audio",
    wma: "audio",
    webm: "audio",
    wav: "audio",
    mp4: "audio",
    mpeg: "audio",
    aax: "audio",
    voc: "audio",
    mpc: "audio",
    gsm: "audio",
    pcm: "audio",
    aiff: "audio",
    aac: "audio",
    ogg: "audio",
    flac: "audio",
    alac: "audio",
};
exports.AcceptedVideoExt = {
    mp4: "video",
    mpeg: "video",
    avi: "video",
    flv: "video",
    "3gp": "video",
    ogg: "video",
    wmv: "video",
    webm: "video",
    vob: "video",
    wav: "video",
    lxf: "video",
    mkv: "video",
};
function getIssuer() {
    return config.ISSUER || "http://localhost:8900";
}
function getAuthExpiration() {
    return config.AUTH_EXPIRESIN || 43200;
}
function getMailExpiration() {
    return config.MAIL_EXPIRESIN || 86400;
}
exports.currentAuthKey = "42";
exports.currentVerifyKey = "43";
exports.currentRsaAlgType = "RS256";
exports.issuer = getIssuer();
exports.authExpiration = getAuthExpiration();
exports.mailExpiration = getMailExpiration();
exports.verifyTokenExpiration = getMailExpiration();
//# sourceMappingURL=Constant.js.map