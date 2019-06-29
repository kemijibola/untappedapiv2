"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var CommentSchema = /** @class */ (function () {
    function CommentSchema() {
    }
    Object.defineProperty(CommentSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
                entity: { type: String, required: true },
                comment: { type: String, required: true },
                user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
                replies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Reply' }]
            }, { timestamps: true });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return CommentSchema;
}());
var schema = mongooseConnection.model('Comment', CommentSchema.schema);
module.exports = schema;
//# sourceMappingURL=Comment.js.map