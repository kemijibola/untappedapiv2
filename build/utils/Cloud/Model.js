"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(storage // private schedule: ICloudSchedule<T>
    ) {
        this.storage = storage;
    }
    getObject(objParams) {
        return this.storage.getObject(objParams);
    }
    putObject() { }
    createSchedule() { }
    processSchedule() { }
}
exports.Model = Model;
