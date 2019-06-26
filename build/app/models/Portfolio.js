"use strict";
class PortfolioModel {
    constructor(portfolioModel) {
        this._portfolioModel = portfolioModel;
    }
    get title() {
        return this._portfolioModel.title;
    }
    get description() {
        return this._portfolioModel.description;
    }
    get user() {
        return this._portfolioModel.user;
    }
    get mediaType() {
        return this._portfolioModel.mediaType;
    }
    get uploadType() {
        return this._portfolioModel.uploadType;
    }
    get items() {
        return this._portfolioModel.items;
    }
}
Object.seal(PortfolioModel);
module.exports = PortfolioModel;
