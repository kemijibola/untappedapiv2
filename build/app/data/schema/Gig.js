"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var GigSchema = /** @class */ (function () {
    function GigSchema() {
    }
    Object.defineProperty(GigSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                sender: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                receiver: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                note: { type: String },
                items: [{ type: String }],
                deletedBySender: { type: Boolean, default: false },
                deletedByReciver: { type: Boolean, default: false }
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return GigSchema;
}());
var schema = mongooseConnection.model('Gig', GigSchema.schema);
module.exports = schema;
//# sourceMappingURL=Gig.js.map