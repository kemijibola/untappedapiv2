"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListMerger = /** @class */ (function () {
    function ListMerger() {
    }
    ListMerger.prototype.mergeList = function (list1, list2) {
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
        return Object.assign(listMap1, listMap2);
    };
    return ListMerger;
}());
exports.ListMerger = ListMerger;
//# sourceMappingURL=ListMerger.js.map