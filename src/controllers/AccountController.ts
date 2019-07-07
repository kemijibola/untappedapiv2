import { Request, Response, NextFunction } from 'express';
import { controller, get, post, requestValidators, use } from '../decorators';
import {
  ApiResponse,
  AuthResponse,
  AuthUser
} from '../app/models/interfaces/custom/ApiResponse';
import { RequestType } from '../app/models/interfaces/custom/RequestType';
import { IUserModel, IRole, IUser } from '../app/models/interfaces';
import { ILoginUser } from '../app/models/interfaces/custom/Account';
import UserRepository from '../app/repository/UserRepository';
import {
  RecordNotFound,
  InvalidCredentials,
  InternalServerError
} from '../utils/error/ApplicationError';
import { tokenExchange, getPrivateKey, IExchangeToken } from '../utils/lib';
import { SignInOptions } from '../app/models/interfaces/custom/Global';
import { AppConfig } from '../app/models/interfaces/custom/AppConfig';
import { TokenType } from '../app/models/interfaces/custom/GlobalEnum';
const config: AppConfig = require('../config/keys');
import IBaseControler from './interfaces/base/BaseController';
import RoleRepository = require('../app/repository/RoleRepository');

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made');
  next();
}

@controller('/account')
class AuthController implements IBaseControler {
  @post('/login')
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, audience }: ILoginUser = req.body;

      const userModel: IUserModel = await new UserRepository().findByCriteria({
        email: email.toLowerCase()
      });
      if (!userModel) return next(new RecordNotFound('Invalid user.', 404));

      const matched: boolean = await userModel.comparePassword(password);
      if (!matched)
        return next(new InvalidCredentials('Invalid credentials.', 400));

      const params: IExchangeToken = {
        destinationUrl: req.url.toLowerCase(),
        roles: [...userModel.roles.map(x => x._id)]
      };
      console.log(params);
      let permissions: { [x: string]: string } = await tokenExchange(params);
      console.log(permissions);
      // const signInOptions: SignInOptions = {
      //   issuer: config.ISSUER.toLowerCase(),
      //   audience: audience.toLowerCase(),
      //   expiresIn: config.AUTH_EXPIRESIN,
      //   algorithm: config.RSA_ALG_TYPE,
      //   keyid: config.RSA_KEYID,
      //   subject: ''
      // };
      // const payload: { [x: string]: string } = {
      //   token_type: TokenType.AUTH
      // };
      // const privateKey: string = getPrivateKey(config.RSA_KEYID);
      // const token: string = await userModel.generateToken(
      //   privateKey,
      //   signInOptions,
      //   payload
      // );
      // const user: AuthUser = {
      //   _id: userModel._id,
      //   email: userModel.email,
      //   roles: [...userModel.roles.map(user => user.name)]
      // };
      // console.log(user);
      // const response: AuthResponse = {
      //   token: token,
      //   permissions: permissions,
      //   user: user
      // };
      // return res.status(200).json({
      //   message: 'Operation successful',
      //   data: response
      // });
    } catch (err) {
      console.log(err);
      return next(
        new InternalServerError('Internal Server error occured', 500)
      );
    }
  }
  create(req: Request, res: Response, next: NextFunction): void {}
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}
