"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators");
const RequestType_1 = require("../app/models/interfaces/custom/RequestType");
const UserRepository_1 = __importDefault(require("../app/repository/UserRepository"));
const ApplicationError_1 = require("../utils/error/ApplicationError");
const lib_1 = require("../utils/lib");
const GlobalEnum_1 = require("../app/models/interfaces/custom/GlobalEnum");
const config = require('../config/keys');
let AuthController = class AuthController {
    constructor() {
        console.log('in account');
        this._userRepository = new UserRepository_1.default();
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, audience } = req.body;
                const userModel = yield this._userRepository.findByEmail(email.toLowerCase());
                if (!userModel)
                    next(new ApplicationError_1.RecordNotFound('Invalid user.'));
                const matched = yield userModel.comparePassword(password);
                if (!matched)
                    return next(new ApplicationError_1.InvalidCredentials('Invalid credentials.'));
                const destinationUrl = req.url.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
                const params = {
                    destinationUrl: destinationUrl.toLowerCase(),
                    roles: userModel.roles
                };
                let permissions = yield lib_1.tokenExchange(params);
                const signInOptions = {
                    issuer: config.ISSUER,
                    audience: audience.toLowerCase(),
                    expiresIn: config.AUTH_EXPIRESIN,
                    algorithm: config.RSA_ALG_TYPE,
                    keyid: config.RSA_KEYID,
                    subject: ''
                };
                const payload = GlobalEnum_1.TokenType.AUTH;
                const privateKey = lib_1.getPrivateKey(config.RSA_KEYID);
                const token = yield userModel.generateToken(privateKey, signInOptions, payload);
                const user = {
                    _id: userModel._id,
                    email: userModel.email,
                    roles: [...new Set(userModel.roles.map(role => role.name))]
                };
                const response = {
                    token: token,
                    permissions: permissions,
                    user: user
                };
                return res.status(200).json({});
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    create(req, res, next) { }
    update() { }
    delete() { }
    fetch() { }
    findById() { }
};
__decorate([
    decorators_1.post('/login'),
    decorators_1.requestValidators(RequestType_1.RequestType.BODY, 'email', 'password', 'audience'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    decorators_1.controller('/account'),
    __metadata("design:paramtypes", [])
], AuthController);
exports.AuthController = AuthController;
