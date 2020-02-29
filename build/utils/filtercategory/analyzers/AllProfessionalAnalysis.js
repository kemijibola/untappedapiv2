"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../../../app/models/interfaces");
var AllProfessionalAnalysis = /** @class */ (function () {
    function AllProfessionalAnalysis() {
    }
    AllProfessionalAnalysis.prototype.run = function (users) {
        var filteredCategories = [];
        users = users.sort(function (a, b) {
            return b.contestCount - a.contestCount;
        });
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            var filtered = Object.assign({
                user: user.user,
                displayName: user.displayName,
                displayPhoto: user.displayPhoto,
                shortDescription: user.shortDescription || "",
                categories: user.categories || [],
                reportType: interfaces_1.ReportType.AllProfessionals,
                userType: user.userType
            });
            filteredCategories = filteredCategories.concat([filtered]);
        }
        return filteredCategories;
    };
    return AllProfessionalAnalysis;
}());
exports.AllProfessionalAnalysis = AllProfessionalAnalysis;
//# sourceMappingURL=AllProfessionalAnalysis.js.map