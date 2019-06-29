"use strict";
var CountryModel = /** @class */ (function () {
    function CountryModel(countryModel) {
        this.countryModel = countryModel;
        this._countryModel = countryModel;
    }
    Object.defineProperty(CountryModel.prototype, "name", {
        get: function () {
            return this._countryModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountryModel.prototype, "states", {
        get: function () {
            return this._countryModel.states;
        },
        enumerable: true,
        configurable: true
    });
    return CountryModel;
}());
Object.seal(CountryModel);
module.exports = CountryModel;
//# sourceMappingURL=Country.js.map