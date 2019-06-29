"use strict";
var ResourceModel = /** @class */ (function () {
    function ResourceModel(resourceModel) {
        this._resourceModel = resourceModel;
    }
    Object.defineProperty(ResourceModel.prototype, "name", {
        get: function () {
            return this._resourceModel.name;
        },
        enumerable: true,
        configurable: true
    });
    return ResourceModel;
}());
Object.seal(ResourceModel);
module.exports = ResourceModel;
//# sourceMappingURL=Resource.js.map