import UserRepository from '../repository/UserRepository';
import IUserBusiness = require('./interfaces/UserBusiness');
import { IUserModel, IAuthData, ILogin, IRegister } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { IExchangeToken, tokenExchange, getPrivateKey } from '../../utils/lib';
import { SignInOptions } from '../models/interfaces/custom/Global';
import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
import { TokenType } from '../models/interfaces/custom/GlobalEnum';
import { privateEncrypt } from 'crypto';
const config: AppConfig = require('../../config/keys');

class UserBusiness implements IUserBusiness {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  async login(params: ILogin): Promise<Result<IAuthData>> {
    try {
      const user = await this._userRepository.findByCriteria({
        email: params.email.toLowerCase()
      });
      if (!user) return Result.fail<IAuthData>(404, 'User not found.');
      const passwordMatched: boolean = await user.comparePassword(
        params.password
      );
      if (!passwordMatched)
        return Result.fail<IAuthData>(400, 'Invalid credentials');

      const permissionParams: IExchangeToken = {
        destinationUrl: params.destinationUrl.toLowerCase(),
        roles: [...user.roles.map(x => x._id)]
      };
      const permissions: { [x: string]: string } = await tokenExchange(
        permissionParams
      );
      const signInOptions: SignInOptions = {
        issuer: config.ISSUER.toLowerCase(),
        audience: params.audience,
        expiresIn: config.AUTH_EXPIRESIN,
        algorithm: config.RSA_ALG_TYPE,
        keyid: config.RSA_KEYID,
        subject: ''
      };
      const payload: { [x: string]: string } = {
        tokenType: TokenType.AUTH
      };
      const privateKey: string = getPrivateKey(config.RSA_KEYID);
      if (!privateKey)
        return Result.fail<IAuthData>(400, 'The token key provided is invalid');

      const userToken: string = await user.generateToken(
        privateKey,
        signInOptions,
        payload
      );

      const authData: IAuthData = {
        _id: user._id,
        email: user.email,
        roles: [...user.roles.map(role => role.name)],
        permissions: permissions,
        token: userToken
      };
      return Result.ok<IAuthData>(200, authData);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
  // async register(params: IRegister): Promise<Result<IAuthData>> {
  //   return;
  // }
  async fetch(condition: any): Promise<Result<IUserModel>> {
    try {
      const users = await this._userRepository.fetch(condition);
      return Result.ok<IUserModel>(200, users);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IUserModel>> {
    try {
      const user = await this._userRepository.findById(id);
      if (!user)
        return Result.fail<IUserModel>(404, `User with Id ${id} not found`);
      else return Result.ok<IUserModel>(200, user);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IUserModel>> {
    try {
      const user = await this._userRepository.findByCriteria(criteria);
      if (!user) return Result.fail<IUserModel>(404, `User not found`);
      else return Result.ok<IUserModel>(200, user);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IUserModel): Promise<Result<IUserModel>> {
    try {
      const newUser = await this._userRepository.create(item);
      return Result.ok<IUserModel>(201, newUser);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IUserModel): Promise<Result<IUserModel>> {
    try {
      const user = await this._userRepository.findById(id);
      if (!user)
        return Result.fail<IUserModel>(
          404,
          `Could not update user.User of Id ${id} not found`
        );
      const updateObj = await this._userRepository.update(user._id, item);
      return Result.ok<IUserModel>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._userRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(UserBusiness);
export = UserBusiness;
