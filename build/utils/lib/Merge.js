"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Merger = /** @class */ (function () {
    function Merger(merge) {
        this.merge = merge;
    }
    // mergeList<T, K>(param1: T, param2: K): void {
    //   this.merge.mergeList(param1, param2);
    // }
    Merger.merge = function (merger) {
        return new Merger(merger);
    };
    return Merger;
}());
exports.Merger = Merger;
//# sourceMappingURL=Merge.js.map