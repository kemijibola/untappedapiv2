"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Upload_1 = require("./Upload");
var lib_1 = require("../../lib");
var uuid = require("uuid");
var Result_1 = require("../../Result");
var UploadUtil = /** @class */ (function () {
    function UploadUtil() {
    }
    UploadUtil.uploadTransformer = function () {
        return new UploadUtil();
    };
    UploadUtil.prototype.transformData = function (data) {
        var filesMap = data.files.reduce(function (theMap, file) {
            var _a = file.file.split('.'), _ = _a[0], fileExtension = _a[1];
            fileExtension = fileExtension.toLowerCase();
            // we are ensuring the user sent valid media type for processing on s3
            if (!lib_1.AcceptedMedias[fileExtension]) {
                return Result_1.Result.fail(400, fileExtension + " is not allowed.");
            }
            theMap[file.file] = data.uploader + "/" + Upload_1.UPLOADOPERATIONS[data.action] + "/" + lib_1.AcceptedMedias[fileExtension] + "/" + uuid() + "." + fileExtension;
            return theMap;
        }, {});
        return Result_1.Result.ok(200, filesMap);
    };
    return UploadUtil;
}());
exports.UploadUtil = UploadUtil;
//# sourceMappingURL=UploadUtil.js.map