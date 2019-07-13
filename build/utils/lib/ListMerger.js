"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListMerger = /** @class */ (function () {
    function ListMerger() {
    }
    ListMerger.mergeList = function (list1, list2) {
        var listMap1 = list1.reduce(function (theMap, theItem) {
            if (theItem)
                theMap[theItem] = theItem;
            return theMap;
        }, {});
        var listMap2 = list2.reduce(function (theMap, theItem) {
            if (theItem)
                theMap[theItem] = theItem;
            return theMap;
        }, {});
        var merged = Object.assign(listMap1, listMap2);
        Object.seal(merged);
        return Object.keys(merged);
    };
    return ListMerger;
}());
exports.ListMerger = ListMerger;
//# sourceMappingURL=ListMerger.js.map