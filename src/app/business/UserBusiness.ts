import UserRepository from '../repository/UserRepository';
import RoleRepository from '../repository/RoleRepository';
import ScheduledEmailRepository from '../repository/ScheduledEmailRepository';
import ResourceRepository from '../repository/ResourceRepository';
import ResourcePermissionRepository from '../repository/ResourcePermissionRepository';
import PermissionRepository from '../repository/PermissionRepository';
import IUserBusiness = require('./interfaces/UserBusiness');
import {
  IUserModel,
  IAuthData,
  ILogin,
  IRegister,
  IScheduledEmail,
  MailType,
  AuthPayload,
  IResource,
  IResourcePermission
} from '../models/interfaces';
import { Result } from '../../utils/Result';
import {
  IExchangeToken,
  tokenExchange,
  getSecretByKey,
  toObjectId,
  IStringDate,
  ObjectKeyString,
  currentAuthKey,
  currentVerifyKey,
  currentRsaAlgType,
  issuer,
  authExpiration,
  verifyTokenExpiration,
  getPublicKey
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
import { scheduleEmail } from '../../utils/emailservice/ScheduleEmail';
import { schedule } from '../../utils/TaskScheduler';
import { IEmail } from '../../utils/emailservice/EmailService';
import { UserSchema } from '../data/schema/User';
import { StateMachineArns } from '../models/interfaces/custom/StateMachineArns';
import { PlatformError } from '../../utils/error';
import { EntityNotFoundError } from '../../utils/error/EntityNotFound';
import { ConfirmEmailRequest } from '../models/interfaces/custom/Account';

class UserBusiness implements IUserBusiness {
  private _currentAuthKey = '';
  private _currentVerifyKey = '';
  private _currentRsaAlgType = '';
  private _authExpiration = '';
  private _verifyExpiration = '';
  private _userRepository: UserRepository;
  private _roleRepository: RoleRepository;
  private _scheduledEmailRepository: ScheduledEmailRepository;
  private _resourceRepository: ResourceRepository;
  private _resourcePermissionRepository: ResourcePermissionRepository;
  private _permissionRepository: PermissionRepository;
  private chunkedUserPermissons: ObjectKeyString = {};

  constructor() {
    this._userRepository = new UserRepository();
    this._roleRepository = new RoleRepository();
    this._scheduledEmailRepository = new ScheduledEmailRepository();
    this._resourceRepository = new ResourceRepository();
    this._resourcePermissionRepository = new ResourcePermissionRepository();
    this._permissionRepository = new PermissionRepository();
    this._currentAuthKey = currentAuthKey;
    this._currentVerifyKey = currentVerifyKey;
    this._currentRsaAlgType = currentRsaAlgType;
    this._authExpiration = authExpiration;
    this._verifyExpiration = verifyTokenExpiration;
  }

  async findUserByEmail(criteria: any): Promise<IUserModel> {
    return await this._userRepository.findByCriteria(criteria);
  }

  async login(params: ILogin): Promise<Result<IAuthData>> {
    {
      const criteria = {
        email: params.email.toLowerCase()
      };
      const user = await this.findUserByEmail(criteria);

      if (!user) return Result.fail<IAuthData>(404, 'User not found.');

      const passwordMatched: boolean = await user.comparePassword(
        params.password
      );
      if (!passwordMatched)
        return Result.fail<IAuthData>(400, 'Invalid credentials');

      if (!user.isEmailConfirmed)
        return Result.fail<IAuthData>(400, 'Please verify your email.');

      const resource = await this.fetchResourceByName(
        params.destinationUrl.toLowerCase()
      );
      if (resource === null)
        throw new PlatformError({
          code: 404,
          message: `Route: ${params.destinationUrl.toLowerCase()} is not configured.`
        });

      const permissions = await this.fetchRolePermissionByResourceId(
        user.roles,
        resource._id
      );

      const signInOptions: SignInOptions = {
        issuer: params.issuer,
        audience: params.audience,
        expiresIn: this._authExpiration,
        algorithm: this._currentRsaAlgType,
        keyid: this._currentAuthKey,
        subject: ''
      };
      const payload: AuthPayload = {
        type: TokenType.AUTH
      };
      const privateKey: string = getSecretByKey(this._currentAuthKey);
      if (privateKey === '') {
        return Result.fail<IAuthData>(
          400,
          `Private Key is missing for ${this._currentAuthKey}`
        );
      }
      const userToken: string = await user.generateToken(
        privateKey,
        signInOptions,
        payload
      );

      const authData: IAuthData = {
        access_token: userToken,
        roles: [...user.roles],
        permissions: Object.keys(permissions),
        user_data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email
        }
      };
      return Result.ok<IAuthData>(200, authData);
    }
  }

  async confirmEmail(request: ConfirmEmailRequest): Promise<Result<boolean>> {
    const criteria = {
      email: request.userEmail.toLowerCase(),
      isEmailConfirmed: true
    };
    const unverifiedUser: IUserModel = await this.findUserByEmail(criteria);
    if (!unverifiedUser) return Result.fail<boolean>(404, 'User not found.');
    const publicKey = getPublicKey(this._currentVerifyKey);
    const verifyOptions = {
      issuer: issuer,
      email: unverifiedUser.email,
      audience: request.audience,
      expiresIn: verifyTokenExpiration,
      algorithms: [currentRsaAlgType],
      keyid: this._currentVerifyKey
    };
    const decoded = await unverifiedUser.verifyToken(
      request.token,
      publicKey,
      verifyOptions
    );
    if (!decoded)
      if (!unverifiedUser) return Result.fail<boolean>(404, 'Token is invalid');
    // otherwise, set isEmailConfirmed to true
    await this.updateUserIsEmailConfirmed(unverifiedUser);
    return Result.ok<boolean>(200, true);
  }

  async updateUserIsEmailConfirmed(user: IUserModel) {
    user.isEmailConfirmed = true;
    await this._userRepository.update(user._id, user);
  }

  async fetch(condition: any): Promise<Result<any[]>> {
    let refinedUsers: UserViewModel[] = [];
    const users: IUserModel[] = await this._userRepository.fetch(condition);
    for (let user of users) {
      const userViewModel: UserViewModel = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
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
  }

  async findUserForExchange(id: string): Promise<Result<IUserModel>> {
    const user = await this._userRepository.findById(id);
    if (!user) {
      return Result.fail<IUserModel>(404, `User with Id ${id} not found`);
    } else {
      return Result.ok<IUserModel>(200, user);
    }
  }

  async findById(id: string): Promise<Result<any>> {
    if (!id) return Result.fail<IUserModel>(400, 'Bad request');
    const user = await this._userRepository.findById(id);
    if (!user) {
      return Result.fail<IUserModel>(404, `User with Id ${id} not found`);
    } else {
      let refinedUser: UserViewModel = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
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
  }

  async findOne(condition: any): Promise<Result<any>> {
    if (!condition) return Result.fail<IUserModel>(400, 'Bad request');
    const user = await this._userRepository.findByOne(condition);
    if (!user) {
      return Result.fail<IUserModel>(404, `User not found`);
    } else {
      let refinedUser: UserViewModel = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
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
  }

  async findByCriteria(criteria: any): Promise<Result<any>> {
    const user = await this._userRepository.findByCriteria(criteria);
    if (!user) {
      return Result.fail<IUserModel>(404, `User not found`);
    } else {
      let refinedUser: UserViewModel = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
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
  }

  async register(item: IRegister): Promise<Result<boolean>> {
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
        return Result.fail<boolean>(400, `Role id ${key} is not a valid role`);
      roleIds.push(toObjectId(key));
    }

    const newUser: IUserModel = await this._userRepository.register(item);

    const tokenOptions: SignInOptions = {
      issuer: item.issuer,
      audience: item.audience,
      expiresIn: this._authExpiration,
      algorithm: this._currentRsaAlgType,
      keyid: this._currentVerifyKey,
      subject: ''
    };
    const payload: ObjectKeyString = {
      type: TokenType.MAIL,
      email: newUser.email
    };
    const privateKey: string = getSecretByKey(this._currentVerifyKey);
    if (privateKey == '')
      return Result.fail<boolean>(
        400,
        `Private Key is missing for ${this._currentVerifyKey}`
      );
    const verificationToken: string = await newUser.generateToken(
      privateKey,
      tokenOptions,
      payload
    );

    const welcomeEmailKeyValues: TemplateKeyValue[] = this.welcomeEmailKeyValue(
      newUser.fullName,
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

    await schedule(
      StateMachineArns.EmailStateMachine,
      newUser.createdAt,
      mailParams
    );
    return Result.ok<bool>(201, true);
  }

  async create(item: IUserModel): Promise<Result<any>> {
    const newUser = await this._userRepository.create(item);
    let refinedUser: UserViewModel = {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
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
  }

  async update(id: string, item: IUserModel): Promise<Result<IUserModel>> {
    const user = await this._userRepository.findById(id);
    if (!user)
      return Result.fail<IUserModel>(
        404,
        `Could not update user.User of Id ${id} not found`
      );
    const updateObj = await this._userRepository.update(user._id, item);
    return Result.ok<IUserModel>(200, updateObj);
  }

  async patch(id: string, item: any): Promise<Result<UserViewModel>> {
    const user = await this._userRepository.findById(id);
    if (!user)
      return Result.fail<UserViewModel>(
        404,
        `Could not update user.User with Id ${id} not found`
      );
    const updateObj = await this._userRepository.update(user._id, item);
    // console.log(updateObj.);
    let refinedUser: UserViewModel = {
      _id: updateObj._id,
      email: updateObj.email,
      fullName: updateObj.fullName,
      profileImagePath: updateObj.profileImagePath,
      isEmailConfirmed: updateObj.isEmailConfirmed,
      isPhoneConfirmed: updateObj.isPhoneConfirmed,
      isProfileCompleted: updateObj.isProfileCompleted,
      generalNotification: updateObj.generalNotification,
      emailNotification: updateObj.emailNotification,
      profileVisibility: updateObj.profileVisibility,
      loginCount: updateObj.loginCount,
      status: [updateObj.status],
      roles: updateObj.roles,
      lastLogin: updateObj.lastLogin,
      createdAt: updateObj.createdAt
    };
    return Result.ok<UserViewModel>(200, refinedUser);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._userRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
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

  async fetchResourceByName(destinationUrl: string): Promise<IResource> {
    return await this._resourceRepository.findByCriteria({
      name: destinationUrl
    });
  }

  async fetchRolePermissionByResourceId(
    roles: string[],
    resourceId: string
  ): Promise<any> {
    for (let role of roles) {
      const resourcePermission = await this._resourcePermissionRepository.findByCriteria(
        {
          role,
          resource: resourceId
        }
      );
      if (resourcePermission === null)
        throw new PlatformError({
          code: 404,
          message: `There is no resource permission configured for route with Id ${resourceId}`
        });
      if (resourcePermission.permissions.length < 1)
        throw new PlatformError({
          code: 404,
          message: `There are no permissions configured for route with Id ${resourceId}`
        });
      await this.chunckPermission(resourcePermission.permissions);
      return this.chunkedUserPermissons;
    }
  }

  async chunckPermission(permissions: string[]) {
    for (let item of permissions) {
      const permission = await this._permissionRepository.findByCriteria(item);
      if (permission) {
        if (!this.chunkedUserPermissons[permission.name]) {
          this.chunkedUserPermissons[permission.name] = permission.name;
        }
      }
    }
  }
}

Object.seal(UserBusiness);
export = UserBusiness;
