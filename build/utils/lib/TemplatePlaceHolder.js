"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaHandles = {
    Twitter: 'https://www.twitter.com/untappedpool',
    Facebook: 'https://www.facebook.com/untappedpool',
    Instagram: 'https://www.instagram.com/official_untappedpool'
};
var PlaceHolderKey;
(function (PlaceHolderKey) {
    PlaceHolderKey["Twitter"] = "[Twitter]";
    PlaceHolderKey["Facebook"] = "[Facebook]";
    PlaceHolderKey["Instagram"] = "[Instagram]";
    PlaceHolderKey["Name"] = "[Name]";
    PlaceHolderKey["PlatformUrl"] = "[PlatformUrl]";
    PlaceHolderKey["VerifyToken"] = "[VerifyToken]";
    PlaceHolderKey["FullVerifyToken"] = "[FullVerifyToken]";
})(PlaceHolderKey = exports.PlaceHolderKey || (exports.PlaceHolderKey = {}));
function replaceTemplateString(param) {
    var template = param.template;
    for (var _i = 0, _a = param.placeholders; _i < _a.length; _i++) {
        var item = _a[_i];
        template = template.replace(item.key, item.value);
    }
    return template;
}
exports.replaceTemplateString = replaceTemplateString;
//# sourceMappingURL=TemplatePlaceHolder.js.map