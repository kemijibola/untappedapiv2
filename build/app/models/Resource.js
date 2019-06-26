"use strict";
class ResourceModel {
    constructor(resourceModel) {
        this._resourceModel = resourceModel;
    }
    get name() {
        return this._resourceModel.name;
    }
}
Object.seal(ResourceModel);
module.exports = ResourceModel;
