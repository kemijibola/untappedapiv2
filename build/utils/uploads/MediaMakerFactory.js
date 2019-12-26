"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Image_1 = require("./medias/Image");
var Audio_1 = require("./medias/Audio");
var Video_1 = require("./medias/Video");
var MediaMakerFactory = /** @class */ (function () {
    function MediaMakerFactory() {
    }
    MediaMakerFactory.prototype.create = function (fileType) {
        if (fileType === "image") {
            return new Image_1.Image();
        }
        else if (fileType === "audio") {
            return new Audio_1.Audio();
        }
        else if (fileType === "video") {
            return new Video_1.Video();
        }
        else {
            throw new Error("Invalid typeOfFile");
        }
    };
    return MediaMakerFactory;
}());
exports.MediaMakerFactory = MediaMakerFactory;
//# sourceMappingURL=MediaMakerFactory.js.map