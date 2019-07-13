"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Merger_1 = require("./Merger");
var StringListMerger = /** @class */ (function (_super) {
    __extends(StringListMerger, _super);
    function StringListMerger(params1, params2) {
        var _this = _super.call(this) || this;
        _this.params1 = params1;
        _this.params2 = params2;
        return _this;
    }
    Object.defineProperty(StringListMerger.prototype, "list1", {
        get: function () {
            return this.params1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringListMerger.prototype, "list2", {
        get: function () {
            return this.params2;
        },
        enumerable: true,
        configurable: true
    });
    StringListMerger.prototype.mergeList = function () {
        var listMap1 = this.list1.reduce(function (theMap, theItem) {
            if (!theMap[theItem])
                theMap[theItem] = theItem;
            return theMap;
        }, {});
        var listMap2 = this.list2.reduce(function (theMap, theItem) {
            if (!theMap[theItem])
                theMap[theItem] = theItem;
            return theMap;
        }, {});
        var merged = Object.assign(listMap1, listMap2);
        console.log(merged);
        return Object.seal(Object.keys(merged));
    };
    return StringListMerger;
}(Merger_1.Merger));
exports.StringListMerger = StringListMerger;
//# sourceMappingURL=StringMerger.js.map