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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var UserRepository_1 = __importDefault(require("../app/repository/UserRepository"));
var config = require('../config/keys');
function logger(req, res, next) {
    console.log('Request was made');
    next();
}
var AuthController = /** @class */ (function () {
    function AuthController() {
        this._userRepository = new UserRepository_1.default();
    }
    AuthController.prototype.postLogin = function (req, res, next) {
        res.json({ success: 'true' });
        // try {
        //   const { email, password, audience }: ILoginUser = req.body;
        //   const userModel: IUserModel = await this._userRepository.findByEmail(
        //     email.toLowerCase()
        //   );
        //   if (!userModel) next(new RecordNotFound('Invalid user.'));
        //   const matched: boolean = await userModel.comparePassword(password);
        //   if (!matched) return next(new InvalidCredentials('Invalid credentials.'));
        //   const destinationUrl: string = req.url.replace(
        //     /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        //     ''
        //   );
        //   const params: IExchangeToken = {
        //     destinationUrl: destinationUrl.toLowerCase(),
        //     roles: userModel.roles
        //   };
        //   let permissions: { [x: string]: string } = await tokenExchange(params);
        //   const signInOptions: SignInOptions = {
        //     issuer: config.ISSUER,
        //     audience: audience.toLowerCase(),
        //     expiresIn: config.AUTH_EXPIRESIN,
        //     algorithm: config.RSA_ALG_TYPE,
        //     keyid: config.RSA_KEYID,
        //     subject: ''
        //   };
        //   const payload: string = TokenType.AUTH;
        //   const privateKey: string = getPrivateKey(config.RSA_KEYID);
        //   const token: string = await userModel.generateToken(
        //     privateKey,
        //     signInOptions,
        //     payload
        //   );
        //   const user: AuthUser = {
        //     _id: userModel._id,
        //     email: userModel.email,
        //     roles: [...new Set(userModel.roles.map(role => role.name))]
        //   };
        //   const response: AuthResponse = {
        //     token: token,
        //     permissions: permissions,
        //     user: user
        //   };
        //   return res.status(200).json({});
        // } catch (e) {
        //   console.log(e);
        // }
    };
    __decorate([
        decorators_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "postLogin", null);
    AuthController = __decorate([
        decorators_1.controller('/account'),
        __metadata("design:paramtypes", [])
    ], AuthController);
    return AuthController;
}());
//# sourceMappingURL=AccountController.js.map