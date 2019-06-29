"use strict";
var PortfolioModel = /** @class */ (function () {
    function PortfolioModel(portfolioModel) {
        this._portfolioModel = portfolioModel;
    }
    Object.defineProperty(PortfolioModel.prototype, "title", {
        get: function () {
            return this._portfolioModel.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortfolioModel.prototype, "description", {
        get: function () {
            return this._portfolioModel.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortfolioModel.prototype, "user", {
        get: function () {
            return this._portfolioModel.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortfolioModel.prototype, "mediaType", {
        get: function () {
            return this._portfolioModel.mediaType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortfolioModel.prototype, "uploadType", {
        get: function () {
            return this._portfolioModel.uploadType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortfolioModel.prototype, "items", {
        get: function () {
            return this._portfolioModel.items;
        },
        enumerable: true,
        configurable: true
    });
    return PortfolioModel;
}());
Object.seal(PortfolioModel);
module.exports = PortfolioModel;
//# sourceMappingURL=Portfolio.js.map