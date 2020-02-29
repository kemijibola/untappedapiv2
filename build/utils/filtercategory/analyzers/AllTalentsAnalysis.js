"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../../../app/models/interfaces");
var AllTalentsAnalysis = /** @class */ (function () {
    function AllTalentsAnalysis() {
    }
    AllTalentsAnalysis.prototype.run = function (users) {
        var _this = this;
        var filteredCategories = [];
        users = users.sort(function (a, b) {
            return _this.getTime(a.createdAt) - _this.getTime(b.createdAt);
        });
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            var filtered = Object.assign({
                user: user.user,
                displayName: user.displayName,
                displayPhoto: user.displayPhoto,
                shortDescription: user.shortDescription || "",
                categories: user.categories || [],
                reportType: interfaces_1.ReportType.AllTalents,
                userType: user.userType
            });
            filteredCategories = filteredCategories.concat([filtered]);
        }
        return filteredCategories;
    };
    AllTalentsAnalysis.prototype.getTime = function (date) {
        return date != null ? new Date(date).getTime() : 0;
    };
    return AllTalentsAnalysis;
}());
exports.AllTalentsAnalysis = AllTalentsAnalysis;
//# sourceMappingURL=AllTalentsAnalysis.js.map