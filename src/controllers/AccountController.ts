import { Request, Response, NextFunction } from 'express';
import {
  controller,
  get,
  post,
  del,
  patch,
  use,
  requestValidators
} from '../decorators';
import {
  ApiResponse,
  AuthResponse,
  AuthUser
} from '../app/models/interfaces/custom/ApiResponse';
import { RequestType } from '../app/models/interfaces/custom/RequestType';
import { IUserModel, IRole } from '../app/models/interfaces';
import { ILoginUser } from '../app/models/interfaces/custom/Account';
import UserRepository from '../app/repository/UserRepository';
import {
  RecordNotFound,
  InvalidCredentials
} from '../utils/error/ApplicationError';
import { tokenExchange, getPrivateKey, IExchangeToken } from '../utils/lib';
import { SignInOptions } from '../app/models/interfaces/custom/Global';
import { AppConfig } from '../app/models/interfaces/custom/AppConfig';
import { TokenType } from '../app/models/interfaces/custom/GlobalEnum';
const config: AppConfig = require('../config/keys');
import IBaseControler from './interfaces/base/BaseController';

@controller('/account')
export class AuthController implements IBaseControler {
  private _userRepository: UserRepository;
  constructor() {
    console.log('in account');
    this._userRepository = new UserRepository();
  }

  @post('/login')
  @requestValidators(RequestType.BODY, 'email', 'password', 'audience')
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, audience }: ILoginUser = req.body;

      const userModel: IUserModel = await this._userRepository.findByEmail(
        email.toLowerCase()
      );
      if (!userModel) next(new RecordNotFound('Invalid user.'));

      const matched: boolean = await userModel.comparePassword(password);
      if (!matched) return next(new InvalidCredentials('Invalid credentials.'));
      const destinationUrl: string = req.url.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      );
      const params: IExchangeToken = {
        destinationUrl: destinationUrl.toLowerCase(),
        roles: userModel.roles
      };
      let permissions: { [x: string]: string } = await tokenExchange(params);
      const signInOptions: SignInOptions = {
        issuer: config.ISSUER,
        audience: audience.toLowerCase(),
        expiresIn: config.AUTH_EXPIRESIN,
        algorithm: config.RSA_ALG_TYPE,
        keyid: config.RSA_KEYID,
        subject: ''
      };
      const payload: string = TokenType.AUTH;
      const privateKey: string = getPrivateKey(config.RSA_KEYID);
      const token: string = await userModel.generateToken(
        privateKey,
        signInOptions,
        payload
      );

      const user: AuthUser = {
        _id: userModel._id,
        email: userModel.email,
        roles: [...new Set(userModel.roles.map(role => role.name))]
      };
      const response: AuthResponse = {
        token: token,
        permissions: permissions,
        user: user
      };
      return res.status(200).json({});
    } catch (e) {
      console.log(e);
    }
  }
  create(req: Request, res: Response, next: NextFunction): void {}
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}
