"use strict";
class CountryModel {
    constructor(countryModel) {
        this.countryModel = countryModel;
        this._countryModel = countryModel;
    }
    get name() {
        return this._countryModel.name;
    }
    get states() {
        return this._countryModel.states;
    }
}
Object.seal(CountryModel);
module.exports = CountryModel;
