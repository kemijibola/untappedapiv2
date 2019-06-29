"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var PortfolioSchema = /** @class */ (function () {
    function PortfolioSchema() {
    }
    Object.defineProperty(PortfolioSchema, "schema", {
        get: function () {
            var collectionSchema = new mongoose_1.Schema({
                path: { type: String, required: true },
                likes: { type: Number, required: true, default: 0 }
            });
            var schema = new mongoose_1.Schema({
                title: { type: String, required: true },
                description: { type: String },
                user: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                mediaType: { type: String, required: true },
                uploadType: { type: String, required: true },
                items: [collectionSchema]
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return PortfolioSchema;
}());
var schema = mongooseConnection.model('Portfolio', PortfolioSchema.schema);
module.exports = schema;
//# sourceMappingURL=Portfolio.js.map