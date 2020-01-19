"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("../../config/keys");
exports.audioExtentions = [
    "mp3",
    "3gp",
    "aax",
    "wma",
    "webm",
    "wav",
    "voc",
    "mpc",
    "gsm",
    "pcm",
    "aiff",
    "aac",
    "ogg",
    "flac",
    "alac"
];
exports.videoExtensions = [
    "mp4",
    "3gp",
    "ogg",
    "wmv",
    "webm",
    "flv",
    "avi",
    "vob",
    "mpeg",
    "wav",
    "lxf"
];
exports.imageExtensions = [
    "jpeg",
    "jpg",
    "exif",
    "tiff",
    "gif",
    "bmp",
    "png",
    "ppm",
    "webp",
    "svg",
    "bat",
    "heif",
    "bpg"
];
exports.AcceptedImageExt = {
    png: "image",
    jpeg: "image",
    jpg: "image",
    gif: "image",
    svg: "image"
};
exports.AcceptedAudioExt = {
    mp3: "audio",
    wma: "audio",
    webm: "audio",
    wav: "audio"
};
exports.AcceptedVideoExt = {
    mp4: "video",
    mpeg: "video",
    avi: "video",
    flv: "video",
    "3gp": "video"
};
function getIssuer() {
    return config.ISSUER.toLowerCase() || "http://localhost:8900";
}
function getAuthExpiration() {
    return config.AUTH_EXPIRESIN || "12h";
}
function getMailExpiration() {
    return config.MAIL_EXPIRESIN || "2h";
}
exports.currentAuthKey = "42";
exports.currentVerifyKey = "43";
exports.currentRsaAlgType = "RS256";
exports.issuer = getIssuer();
exports.authExpiration = getAuthExpiration();
exports.mailExpiration = getMailExpiration();
exports.verifyTokenExpiration = getMailExpiration();
//# sourceMappingURL=Constant.js.map