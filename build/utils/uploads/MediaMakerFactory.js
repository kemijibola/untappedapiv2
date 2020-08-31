"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Image_1 = require("./medias/Image");
var Audio_1 = require("./medias/Audio");
var Video_1 = require("./medias/Video");
var error_1 = require("../error");
var MediaMakerFactory = /** @class */ (function () {
    function MediaMakerFactory() {
    }
    MediaMakerFactory.prototype.create = function (fileType) {
        if (fileType === "image") {
            return new Image_1.Image();
        }
        if (fileType === "audio") {
            return new Audio_1.Audio();
        }
        if (fileType === "video") {
            return new Video_1.Video();
        }
        else {
            throw new error_1.PlatformError({
                code: 400,
                message: "mediaType is invalid.",
            });
        }
    };
    return MediaMakerFactory;
}());
exports.MediaMakerFactory = MediaMakerFactory;
//# sourceMappingURL=MediaMakerFactory.js.map