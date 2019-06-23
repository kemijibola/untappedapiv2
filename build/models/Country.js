"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var countrySchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });
var Country = mongoose_1.default.model('Country', countrySchema);
exports.default = Country;
