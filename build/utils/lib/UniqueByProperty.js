"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueValuesByProp = function (property) { return function (arr) {
    return Array.from(arr
        .reduce(function (acc, item) { return (item && item[property] && acc.set(item[property], item),
        acc); }, new Map())
        .values());
}; };
exports.UniqueValues = function (arr) {
    return Array.from(arr.reduce(function (acc, item) { return (item && acc.set(item),
        acc); }, new Map())
        .values());
};
// const uniqueById = UniqueValuesByProp("id");
// const unifiedArray = uniqueById(arrayWithDuplicates);
//# sourceMappingURL=UniqueByProperty.js.map