"use strict";
var Profile = /** @class */ (function () {
    function Profile(builder) {
        this.stageName = builder.stageName;
        this.location = builder.location;
        this.user = builder.user;
        this.shortBio = builder.shortBio;
        this.categories = builder.categories;
        this.socialMedias = builder.socialMedias;
        this.profileImagePath = builder.profileImagePath;
        this.physicalStatistics = builder.physicalStatistics;
        this.businessName = builder.businessName;
        this.officialAddress = builder.officialAddress;
        this.rcNumber = builder.rcNumber;
        this.phoneNumbers = builder.phoneNumbers;
        this.bannerImagePath = builder.bannerImagePath;
    }
    return Profile;
}());
Object.seal(Profile);
module.exports = Profile;
//# sourceMappingURL=Profile.js.map