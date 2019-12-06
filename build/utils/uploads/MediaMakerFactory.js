"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Image_1 = require("./medias/Image");
var MediaMakerFactory = /** @class */ (function () {
    function MediaMakerFactory() {
    }
    MediaMakerFactory.prototype.create = function (fileType) {
        if (fileType === "image")
            return new Image_1.Image();
        throw new Error("not found");
    };
    return MediaMakerFactory;
}());
exports.MediaMakerFactory = MediaMakerFactory;
//# sourceMappingURL=MediaMakerFactory.js.map