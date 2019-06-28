"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const MongodataAccess_1 = __importDefault(require("../MongodataAccess"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess_1.default.mongooseConnection;
class UserSchema {
    static get schema() {
        const userAccountStatusSchema = new mongoose_1.Schema({
            status: { type: String },
            updatedAt: { type: Date }
        });
        const schema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Role',
                required: true
            },
            lastLogin: { type: Date }
        }, { timestamps: true });
        return schema;
    }
}
UserSchema.schema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, this.password);
    });
};
UserSchema.schema.methods.generateToken = function (privateKey, signOptions, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        /*  extra data to be sent back to user is an object = { scopes: [], user_type: ''}
         **   and any extra  information the system might need
         */
        signOptions.subject = this._id;
        return yield jsonwebtoken_1.default.sign(payload, privateKey, signOptions);
    });
};
// UserSchema.schema.pre<IUserModel>('save', function(next: any) {
//   console.log('pre-saving hook called');
//   const user = this;
//   console.log(user.name);
// });
const schema = mongooseConnection.model('User', UserSchema.schema);
module.exports = schema;
