"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlaceHolders = {
    _____Twitter_____: 'htmtps://twitter.com/untappedpool',
    _____Facebook_____: 'https://facebook.com/untappedpool'
};
var PlaceHolderKeys;
(function (PlaceHolderKeys) {
    PlaceHolderKeys["_____Twitter_____"] = "_____Twitter_____";
    PlaceHolderKeys["_____Facebook_____"] = "_____Facebook_____";
})(PlaceHolderKeys = exports.PlaceHolderKeys || (exports.PlaceHolderKeys = {}));
function replaceTemplateString(param) {
    for (var _i = 0, _a = param.placeholders; _i < _a.length; _i++) {
        var key = _a[_i];
        param.template.replace(key, PlaceHolders[key]);
    }
    return param.template;
}
exports.replaceTemplateString = replaceTemplateString;
//# sourceMappingURL=TemplatePlaceHolder.js.map