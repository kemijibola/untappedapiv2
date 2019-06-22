"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = /** @class */ (function () {
    function AppSettings(configuration) {
        this.configuration = configuration;
    }
    AppSettings.prototype.configureAppSettings = function (config) {
        this.configuration.setConfig(config);
    };
    return AppSettings;
}());
exports.AppSettings = AppSettings;
