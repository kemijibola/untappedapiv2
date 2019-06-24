"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppSettings {
    constructor(configuration) {
        this.configuration = configuration;
    }
    configureAppSettings(config) {
        this.configuration.setConfig(config);
    }
}
exports.AppSettings = AppSettings;
