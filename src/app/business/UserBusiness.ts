import UserRepository from '../repository/UserRepository';
import RoleRepository from '../repository/RoleRepository';
import ScheduledEmailRepository from '../repository/ScheduledEmailRepository';
import IUserBusiness = require('./interfaces/UserBusiness');
import {
  IUserModel,
  IAuthData,
  ILogin,
  IRegister,
  IScheduledEmail,
  MailType
} from '../models/interfaces';
import { Result } from '../../utils/Result';
import {
  IExchangeToken,
  tokenExchange,
  getPrivateKey,
  toObjectId,
  IStringDate
} from '../../utils/lib';
import { SignInOptions } from '../models/interfaces/custom/Global';
import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
import { TokenType } from '../models/interfaces/custom/GlobalEnum';
import { UserViewModel, SignUpEmailViewModel } from '../models/viewmodels';
import { bool } from 'aws-sdk/clients/signer';
import { WelcomeEmail } from '../../utils/emailtemplates';
import {
  TemplatePlaceHolder,
  TemplateKeyValue,
  PlaceHolderKey,
  SocialMediaHandles,
  replaceTemplateString
} from '../../utils/lib/TemplatePlaceHolder';

const config: AppConfig = require('../../config/keys');
import * as cloudConfig from '../../config/cloudConfig.json';
import { scheduleEmail } from '../../utils/emailservice/ScheduleEmail';
import { IEmail } from '../../utils/emailservice/EmailService';
import { addSeconds } from 'date-fns';

class UserBusiness implements IUserBusiness {
  private _userRepository: UserRepository;
  private _roleRepository: RoleRepository;
  private _scheduledEmailRepository: ScheduledEmailRepository;

  constructor() {
    this._userRepository = new UserRepository();
    this._roleRepository = new RoleRepository();
    this._scheduledEmailRepository = new ScheduledEmailRepository();
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
  async fetch(condition: any): Promise<Result<any[]>> {
    try {
      let refinedUsers: UserViewModel[] = [];
      const users: IUserModel[] = await this._userRepository.fetch(condition);
      for (let user of users) {
        const userViewModel: UserViewModel = {
          _id: user._id,
          email: user.email,
          name: user.username,
          isEmailConfirmed: user.isEmailConfirmed,
          isPhoneConfirmed: user.isPhoneConfirmed,
          isProfileCompleted: user.isProfileCompleted,
          generalNotification: user.generalNotification,
          emailNotification: user.emailNotification,
          profileVisibility: user.profileVisibility,
          loginCount: user.loginCount,
          status: [user.status],
          roles: user.roles,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        };
        refinedUsers = [...refinedUsers, userViewModel];
      }
      return Result.ok<UserViewModel[]>(200, refinedUsers);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<any>> {
    try {
      const user = await this._userRepository.findById(id);
      if (!user) {
        return Result.fail<IUserModel>(404, `User with Id ${id} not found`);
      } else {
        let refinedUser: UserViewModel = {
          _id: user._id,
          email: user.email,
          name: user.username,
          isEmailConfirmed: user.isEmailConfirmed,
          isPhoneConfirmed: user.isPhoneConfirmed,
          isProfileCompleted: user.isProfileCompleted,
          generalNotification: user.generalNotification,
          emailNotification: user.emailNotification,
          profileVisibility: user.profileVisibility,
          loginCount: user.loginCount,
          status: [user.status],
          roles: user.roles,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        };
        return Result.ok<UserViewModel>(200, refinedUser);
      }
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<any>> {
    try {
      const user = await this._userRepository.findByCriteria(criteria);
      if (!user) {
        return Result.fail<IUserModel>(404, `User not found`);
      } else {
        let refinedUser: UserViewModel = {
          _id: user._id,
          email: user.email,
          name: user.username,
          isEmailConfirmed: user.isEmailConfirmed,
          isPhoneConfirmed: user.isPhoneConfirmed,
          isProfileCompleted: user.isProfileCompleted,
          generalNotification: user.generalNotification,
          emailNotification: user.emailNotification,
          profileVisibility: user.profileVisibility,
          loginCount: user.loginCount,
          status: [user.status],
          roles: user.roles,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        };
        return Result.ok<UserViewModel>(200, refinedUser);
      }
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async register(item: IRegister): Promise<Result<boolean>> {
    try {
      // check if user exists in db
      const user: IUserModel = await this._userRepository.findByCriteria({
        email: item.email
      });
      if (user) {
        return Result.fail<boolean>(
          400,
          `There is a user registered with this email: ${item.email}`
        );
      }
      // confirm role/roles are valid and still active
      let roleIds = [];
      for (let key of item.roles) {
        const role = await this._roleRepository.findByCriteria({
          _id: toObjectId(key),
          isActive: true
        });
        if (!role)
          return Result.fail<boolean>(
            400,
            `Role id ${key} is not a valid role`
          );
        roleIds.push(toObjectId(key));
      }

      const newUser: IUserModel = await this._userRepository.register(item);

      const tokenOptions: SignInOptions = {
        issuer: config.ISSUER.toLowerCase(),
        audience: item.audience,
        expiresIn: config.AUTH_EXPIRESIN,
        algorithm: config.RSA_ALG_TYPE,
        keyid: config.RSA_KEYID,
        subject: ''
      };
      const payload: { [x: string]: string } = {
        tokenType: TokenType.MAIL
      };
      const privateKey: string = getPrivateKey(config.RSA_KEYID);
      if (!privateKey)
        return Result.fail<boolean>(400, 'The token key provided is invalid');
      const verificationToken: string = await newUser.generateToken(
        privateKey,
        tokenOptions,
        payload
      );

      const welcomeEmailKeyValues: TemplateKeyValue[] = this.welcomeEmailKeyValue(
        newUser.username,
        item.audience,
        verificationToken
      );
      const welcomeTemplateString: string = WelcomeEmail.template;

      const welcomeEmailPlaceHolder: TemplatePlaceHolder = {
        template: welcomeTemplateString,
        placeholders: welcomeEmailKeyValues
      };

      const emailBody: string = replaceTemplateString(welcomeEmailPlaceHolder);
      const mailParams: IEmail = {
        receivers: [newUser.email],
        subject: 'Signup Welcome Email',
        mail: emailBody,
        senderEmail: 'talents@untappedpool.com',
        senderName: 'Untapped Pool'
      };

      // const dueDate = addSeconds(newUser.createdAt, 10);

      const schedule = await scheduleEmail(newUser.createdAt, mailParams);
      console.log(schedule);
      return Result.ok<bool>(201, true);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err}`);
    }
  }

  async create(item: IUserModel): Promise<Result<any>> {
    try {
      const newUser = await this._userRepository.create(item);
      let refinedUser: UserViewModel = {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.username,
        isEmailConfirmed: newUser.isEmailConfirmed,
        isPhoneConfirmed: newUser.isPhoneConfirmed,
        isProfileCompleted: newUser.isProfileCompleted,
        generalNotification: newUser.generalNotification,
        emailNotification: newUser.emailNotification,
        profileVisibility: newUser.profileVisibility,
        loginCount: newUser.loginCount,
        status: [newUser.status],
        roles: newUser.roles,
        lastLogin: newUser.lastLogin,
        createdAt: newUser.createdAt
      };
      return Result.ok<UserViewModel>(201, refinedUser);
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

  private welcomeEmailKeyValue(
    userName: string,
    audience: string,
    verificationUrl: string
  ): TemplateKeyValue[] {
    return [
      {
        key: PlaceHolderKey.Facebook,
        value: SocialMediaHandles.Facebook
      },
      {
        key: PlaceHolderKey.Instagram,
        value: SocialMediaHandles.Instagram
      },
      {
        key: PlaceHolderKey.Twitter,
        value: SocialMediaHandles.Twitter
      },
      {
        key: PlaceHolderKey.Name,
        value: userName
      },
      {
        key: PlaceHolderKey.VerificationUrl,
        value: verificationUrl
      },
      {
        key: PlaceHolderKey.PlatformUrl,
        value: audience
      }
    ];
  }
}

Object.seal(UserBusiness);
export = UserBusiness;