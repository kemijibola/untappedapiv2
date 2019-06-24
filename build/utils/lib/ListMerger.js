"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListMerger {
    mergeList(list1, list2) {
        let listMap1 = list1.reduce((theMap, theItem) => {
            if (theItem)
                theMap[theItem] = theItem;
            return theMap;
        }, {});
        let listMap2 = list2.reduce((theMap, theItem) => {
            if (theItem)
                theMap[theItem] = theItem;
            return theMap;
        }, {});
        return Object.assign(listMap1, listMap2);
    }
}
exports.ListMerger = ListMerger;
