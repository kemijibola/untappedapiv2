"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess_1 = __importDefault(require("../MongodataAccess"));
var mongoose_1 = require("mongoose");
var interfaces_1 = require("../../models/interfaces");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongooseConnection = MongodataAccess_1.default.mongooseConnection;
var userAccountStatusSchema = new mongoose_1.Schema({
    status: { type: interfaces_1.AccountStatus },
    updatedAt: { type: Date }
});
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImagePath: { type: String },
    isEmailConfirmed: { type: Boolean, default: false },
    isPhoneConfirmed: { type: Boolean, default: false },
    isProfileCompleted: { type: Boolean, default: false },
    generalNotification: { type: Boolean, default: true },
    tapNotification: { type: Boolean, default: true },
    emailNotification: { type: Boolean, default: true },
    profileVisibility: { type: Boolean, default: false },
    isBounced: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0 },
    status: [{ type: userAccountStatusSchema }],
    roles: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }
    ],
    lastLogin: { type: Date },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.compare(candidatePassword, this.password)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
userSchema.methods.generateToken = function (privateKey, signOptions, payload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /*  extra data to be sent back to user is an object = { scopes: [], user_type: ''}
                     **   and any extra information the system might need
                     */
                    signOptions.subject = this._id.toString();
                    return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, privateKey, signOptions)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt_1.default.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.pre('save', function (next) {
    var now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.UserSchema = mongooseConnection.model('User', userSchema);
//# sourceMappingURL=User.js.map