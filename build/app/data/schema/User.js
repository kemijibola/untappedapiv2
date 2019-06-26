"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
class UserSchema {
    static get schema() {
        const userAccountStatusSchema = mongoose.Schema({
            status: { type: String },
            updatedAt: { type: Date }
        });
        const schema = mongoose.Schema({
            email: { type: String, required: true, unique: true },
            name: { type: String, required: true },
            password: { type: String, required: true },
            isEmailConfirmed: { type: Boolean, default: false },
            isPhoneConfirmed: { type: Boolean, default: false },
            isProfileCompleted: { type: Boolean, default: false },
            generalNotification: { type: Boolean, default: true },
            emailNotification: { type: Boolean, default: true },
            profileVisibility: { type: Boolean, default: false },
            loginCount: { type: Number, default: 0 },
            status: userAccountStatusSchema,
            roles: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
                required: true
            },
            lastLogin: { type: Date }
        }, { timestamps: true });
        return schema;
    }
}
const schema = mongooseConnection.model('User', UserSchema.schema);
module.exports = schema;
