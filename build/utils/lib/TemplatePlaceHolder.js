"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceHolders = {
    _____Twitter_____: 'htmtps://twitter.com/untappedpool',
    _____Facebook_____: 'https://facebook.com/untappedpool'
};
var PlaceHolderKeys;
(function (PlaceHolderKeys) {
    PlaceHolderKeys["_____Twitter_____"] = "_____Twitter_____";
    PlaceHolderKeys["_____Facebook_____"] = "_____Facebook_____";
})(PlaceHolderKeys = exports.PlaceHolderKeys || (exports.PlaceHolderKeys = {}));
function replaceTemplateString(param) {
    for (const key of param.placeholders) {
        param.template.replace(key, PlaceHolders[key]);
    }
    return param.template;
}
exports.replaceTemplateString = replaceTemplateString;
