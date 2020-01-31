import UserRepository from "../repository/UserRepository";
import RoleRepository from "../repository/RoleRepository";
import ScheduledEmailRepository from "../repository/ScheduledEmailRepository";
import RolePermissionRepository from "../repository/RolePermissionRepository";
import PermissionRepository from "../repository/PermissionRepository";
import RefreshTokenRepository from "../repository/RefreshTokenRepository";
import IUserBusiness = require("./interfaces/UserBusiness");
import {
  IUserModel,
  IAuthData,
  ILogin,
  IRegister,
  IScheduledEmail,
  MailType,
  AuthPayload,
  IRolePermission,
  IPermission,
  ImageEditRequest,
  IRefreshToken,
  IRefreshTokenViewModel
} from "../models/interfaces";
import { Result } from "../../utils/Result";
import {
  IExchangeToken,
  getSecretByKey,
  IStringDate,
  ObjectKeyString,
  currentAuthKey,
  currentVerifyKey,
  currentRsaAlgType,
  issuer,
  authExpiration,
  mailExpiration,
  verifyTokenExpiration,
  getPublicKey,
  validateObjectId
} from "../../utils/lib";
import { SignInOptions } from "../models/interfaces/custom/Global";
import { AppConfig } from "../../app/models/interfaces/custom/AppConfig";
import { TokenType } from "../models/interfaces/custom/GlobalEnum";
import { UserViewModel, SignUpEmailViewModel } from "../models/viewmodels";
import { bool } from "aws-sdk/clients/signer";
import { WelcomeEmail, ForgotPasswordEmail } from "../../utils/emailtemplates";
import {
  TemplatePlaceHolder,
  TemplateKeyValue,
  PlaceHolderKey,
  SocialMediaHandles,
  replaceTemplateString
} from "../../utils/lib/TemplatePlaceHolder";
const config: AppConfig = require("../../config/keys");
// import { scheduleEmail } from '../../utils/emailservice/ScheduleEmail';
import { schedule } from "../../handlers/ScheduleTask";
import { IEmail } from "../../utils/emailservice/EmailService";
import { UserSchema } from "../data/schema/User";
import { StateMachineArns } from "../models/interfaces/custom/StateMachineArns";
import { PlatformError } from "../../utils/error";
import { EntityNotFoundError } from "../../utils/error/EntityNotFound";
import {
  ConfirmEmailRequest,
  TokenResult,
  TokenGenerationRequest,
  ChangePasswordData,
  VerifyResetPasswordRequest,
  ResetPasswordRequest
} from "../models/interfaces/custom/Account";
import UserTypeRepository from "../repository/UserTypeRepository";
import uuid from "uuid";
import { addSeconds, getDate, addHours } from "date-fns";

class UserBusiness implements IUserBusiness {
  private _currentAuthKey = "";
  private _currentVerifyKey = "";
  private _currentRsaAlgType = "";
  private _authExpiration = 0;
  private _mailExpiratation = 0;
  private _verifyExpiration = 0;
  private _userRepository: UserRepository;
  private _userTypeRepository: UserTypeRepository;
  private _roleRepository: RoleRepository;
  private _scheduledEmailRepository: ScheduledEmailRepository;
  private _rolePermissionRepository: RolePermissionRepository;
  private _permissionRepository: PermissionRepository;
  private _refreshTokenRepository: RefreshTokenRepository;
  private chunkedUserPermissons: IRolePermission[] = [];

  constructor() {
    this._userRepository = new UserRepository();
    this._roleRepository = new RoleRepository();
    this._userTypeRepository = new UserTypeRepository();
    this._scheduledEmailRepository = new ScheduledEmailRepository();
    this._rolePermissionRepository = new RolePermissionRepository();
    this._permissionRepository = new PermissionRepository();
    this._currentAuthKey = currentAuthKey;
    this._currentVerifyKey = currentVerifyKey;
    this._currentRsaAlgType = currentRsaAlgType;
    this._authExpiration = authExpiration;
    this._verifyExpiration = verifyTokenExpiration;
    this._mailExpiratation = mailExpiration;
    this._refreshTokenRepository = new RefreshTokenRepository();
  }

  async findUserByEmail(criteria: any): Promise<IUserModel> {
    return await this._userRepository.findByCriteria(criteria);
  }

  async refreshToken(
    userId: string,
    audience: string,
    refreshTokenParams: IRefreshTokenViewModel
  ): Promise<Result<IAuthData>> {
    {
      const user = await this.findById(userId);
      const error = user.error ? user.error : "";
      if (user.data) {
        if (!user.data.isEmailConfirmed)
          return Result.fail<IAuthData>(401, "Please verify your email.");

        for (let role of user.data.roles) {
          const permissions = await this.fetchPermissionsByRole(role);
          if (permissions) {
            this.chunkedUserPermissons.push(...permissions);
          }
        }

        const signInOptions: SignInOptions = {
          issuer: config.AUTH_ISSUER_SERVER,
          audience,
          expiresIn: `${this._authExpiration}hr`,
          algorithm: this._currentRsaAlgType,
          keyid: this._currentAuthKey,
          subject: ""
        };

        const payload: AuthPayload = {
          type: TokenType.AUTH
        };

        const privateKey: string = getSecretByKey(this._currentAuthKey);
        if (privateKey === "") {
          return Result.fail<IAuthData>(
            401,
            `Private Key is missing for ${this._currentAuthKey}`
          );
        }

        const typeOfUser = await this._userTypeRepository.findById(
          user.data.userType
        );

        const rfToken: IRefreshToken = Object.assign({
          token: uuid(),
          application: refreshTokenParams.application,
          ownerId: user.data._id
        });

        const newUserRefreshToken = await this._refreshTokenRepository.create(
          rfToken
        );

        const userToken: TokenResult = await user.data.generateToken(
          privateKey,
          signInOptions,
          payload
        );

        const tokenExpiration = addHours(new Date(), this._authExpiration);

        if (userToken.error)
          return Result.fail<IAuthData>(401, "Invalid token.");

        const authData: IAuthData = {
          access_token: userToken.data,
          refresh_token: newUserRefreshToken.token,
          rolePermissions: this.chunkedUserPermissons,
          token_expires: tokenExpiration,
          user_data: {
            _id: user.data._id,
            full_name: user.data.fullName,
            email: user.data.email,
            profile_is_completed: user.data.isProfileCompleted,
            profile_image_path: user.data.profileImagePath || "",
            userType: { _id: typeOfUser._id, name: typeOfUser.name }
          }
        };
        return Result.ok<IAuthData>(200, authData);
      }
      return Result.fail<IAuthData>(401, error);
    }
  }

  async login(
    params: ILogin,
    refreshTokenParams: IRefreshTokenViewModel
  ): Promise<Result<IAuthData>> {
    {
      const criteria = {
        email: params.email.toLowerCase()
      };
      const user = await this.findUserByEmail(criteria);

      if (!user)
        return Result.fail<IAuthData>(401, "Invalid username/password");

      const passwordMatched: boolean = await user.comparePassword(
        params.password
      );
      if (!passwordMatched)
        return Result.fail<IAuthData>(401, "Invalid username/password");

      if (!user.isEmailConfirmed)
        return Result.fail<IAuthData>(401, "Please verify your email.");

      for (let role of user.roles) {
        const permissions = await this.fetchPermissionsByRole(role);
        if (permissions) {
          this.chunkedUserPermissons.push(...permissions);
        }
      }

      const signInOptions: SignInOptions = {
        issuer: config.AUTH_ISSUER_SERVER,
        audience: params.audience,
        expiresIn: `${this._authExpiration}hr`,
        algorithm: this._currentRsaAlgType,
        keyid: this._currentAuthKey,
        subject: ""
      };
      const payload: AuthPayload = {
        type: TokenType.AUTH
      };
      const privateKey: string = getSecretByKey(this._currentAuthKey);
      if (privateKey === "") {
        return Result.fail<IAuthData>(
          401,
          `Private Key is missing for ${this._currentAuthKey}`
        );
      }

      const typeOfUser = await this._userTypeRepository.findById(user.userType);

      const rfToken: IRefreshToken = Object.assign({
        token: uuid(),
        application: refreshTokenParams.application,
        ownerId: user._id
      });

      const newUserRefreshToken = await this._refreshTokenRepository.create(
        rfToken
      );

      const userToken: TokenResult = await user.generateToken(
        privateKey,
        signInOptions,
        payload
      );

      const tokenExpiration = addHours(new Date(), this._authExpiration);

      if (userToken.error) return Result.fail<IAuthData>(401, "Invalid token.");

      const authData: IAuthData = {
        access_token: userToken.data,
        refresh_token: newUserRefreshToken.token,
        rolePermissions: this.chunkedUserPermissons,
        token_expires: tokenExpiration,
        user_data: {
          _id: user._id,
          full_name: user.fullName,
          email: user.email,
          profile_is_completed: user.isProfileCompleted,
          profile_image_path: user.profileImagePath || "",
          userType: { _id: typeOfUser._id, name: typeOfUser.name }
        }
      };
      return Result.ok<IAuthData>(200, authData);
    }
  }

  async confirmEmail(request: ConfirmEmailRequest): Promise<Result<string>> {
    const criteria = {
      email: request.userEmail.toLowerCase()
    };
    const unverifiedUser: IUserModel = await this.findUserByEmail(criteria);
    if (!unverifiedUser) return Result.fail<string>(404, "User not found.");
    if (unverifiedUser.isEmailConfirmed)
      return Result.fail<string>(
        400,
        `${unverifiedUser.email} has already been verified.`
      );
    const publicKey = getPublicKey(this._currentVerifyKey);
    const verifyOptions = {
      issuer: config.VERIFICATION_URI,
      algorithms: [this._currentRsaAlgType],
      email: request.userEmail,
      type: TokenType.VERIFY,
      audience: request.audience,
      keyid: this._currentVerifyKey,
      expiresIn: this._mailExpiratation
    };
    const decoded: TokenResult = await unverifiedUser.verifyToken(
      request.token,
      publicKey,
      verifyOptions
    );
    if (decoded.error)
      return Result.fail<string>(400, `${decoded.error.split(".")[0]}`);
    await this.updateUserIsEmailConfirmed(unverifiedUser._id, unverifiedUser);
    return Result.ok<string>(200, "Email successfully verified");
  }

  async updateUserIsEmailConfirmed(id: string, user: IUserModel) {
    user.isEmailConfirmed = true;
    await this._userRepository.patch(id, { isEmailConfirmed: true });
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

  async findById(id: string): Promise<Result<IUserModel>> {
    const user = await this._userRepository.findById(id);
    if (!user) {
      return Result.fail<IUserModel>(404, "User not found");
    }
    return Result.ok<IUserModel>(200, user);
  }

  async findOne(condition: any): Promise<Result<any>> {
    if (!condition) return Result.fail<IUserModel>(400, "Bad request");
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
    const user: IUserModel = await this._userRepository.findByCriteria({
      email: item.email
    });
    if (user) {
      return Result.fail<boolean>(
        409,
        `There is a user registered with this email: ${item.email}`
      );
    }

    const isUserTypeValid = validateObjectId(item.userType);
    if (!isUserTypeValid) {
      return Result.fail<boolean>(400, "Invalid UserType");
    }
    const userType = await this._userTypeRepository.findById(item.userType);
    if (userType === null) {
      return Result.fail<boolean>(400, "UserType not found");
    }

    // assign default role to user
    const defaultRole = await this._roleRepository.findByCriteria({
      isDefault: true,
      isActive: true
    });

    if (defaultRole === null) {
      return Result.fail<boolean>(400, "No role has been assigned yet.");
    }

    item.roles.push(defaultRole._id);

    const newUser: IUserModel = await this._userRepository.register(item);
    // generate token and send to email
    const data: TokenGenerationRequest = {
      user: newUser,
      audience: item.audience,
      tokenExpiresIn: `${this._mailExpiratation}hr`,
      tokenType: TokenType.VERIFY,
      redirectUrl: item.confirmationUrl
    };

    var token = await this.generateToken(data);
    if (token.data) {
      const welcomeEmailKeyValues: TemplateKeyValue[] = this.TokenEmailKeyValue(
        newUser.fullName,
        item.audience,
        `${item.confirmationUrl}?email=${newUser.email}&token=${token.data}`
      );

      const welcomeTemplateString: string = WelcomeEmail.template;

      const welcomeEmailPlaceHolder: TemplatePlaceHolder = {
        template: welcomeTemplateString,
        placeholders: welcomeEmailKeyValues
      };

      const emailBody: string = replaceTemplateString(welcomeEmailPlaceHolder);
      const recievers: string[] = [newUser.email];
      await this.sendMail(recievers, "SignUp Welcome Email", emailBody);
    }
    return Result.ok<bool>(201, true);
  }

  async forgotPassword(
    email: string,
    audience: string,
    redirectUrl: string
  ): Promise<Result<string>> {
    const user: IUserModel = await this._userRepository.findByCriteria({
      email
    });
    if (user) {
      const request: TokenGenerationRequest = {
        user,
        audience,
        tokenExpiresIn: `${this._mailExpiratation}hr`,
        tokenType: TokenType.VERIFY,
        redirectUrl
      };
      var token = await this.generateToken(request);
      if (token.data) {
        const forgorPasswordEmailKeyValues: TemplateKeyValue[] = this.TokenEmailKeyValue(
          user.fullName,
          audience,
          `${redirectUrl}?email=${user.email}&token=${token.data}`
        );
        const forgoPasswordTemplateString: string =
          ForgotPasswordEmail.template;

        const forgotPasswordEmailPlaceHolder: TemplatePlaceHolder = {
          template: forgoPasswordTemplateString,
          placeholders: forgorPasswordEmailKeyValues
        };
        const emailBody: string = replaceTemplateString(
          forgotPasswordEmailPlaceHolder
        );

        const recievers: string[] = [user.email];
        await this.sendMail(recievers, "Reset Your Password", emailBody);
      }
    }

    user.passwordResetRequested = true;
    user.save();

    return Result.ok<string>(
      200,
      "Reset password link has been sent successfully."
    );
  }

  async sendMail(receivers: string[], subject: string, mailBody: string) {
    const mailParams: IEmail = {
      receivers: [...receivers],
      subject,
      mail: mailBody,
      senderEmail: "talents@untappedpool.com",
      senderName: "Untapped Pool"
    };

    await schedule(StateMachineArns.EmailStateMachine, new Date(), mailParams);
  }
  async verifyPasswordResetLink(
    request: VerifyResetPasswordRequest
  ): Promise<Result<string>> {
    const criteria = {
      email: request.email.toLowerCase()
    };
    const unverifiedUser: IUserModel = await this.findUserByEmail(criteria);
    if (!unverifiedUser) return Result.fail<string>(404, "User not found.");
    if (!unverifiedUser.isEmailConfirmed)
      return Result.fail<string>(400, "Please verify email.");
    const publicKey = getPublicKey(this._currentVerifyKey);

    const verifyOptions = {
      issuer: config.VERIFICATION_URI,
      algorithms: [this._currentRsaAlgType],
      email: request.email,
      type: TokenType.VERIFY,
      audience: request.audience,
      keyid: this._currentVerifyKey,
      expiresIn: this._mailExpiratation
    };

    const decoded: TokenResult = await unverifiedUser.verifyToken(
      request.token,
      publicKey,
      verifyOptions
    );
    if (decoded.error)
      return Result.fail<string>(400, `${decoded.error.split(".")[0]}`);
    return Result.ok<string>(200, "Forgot password request has been verified");
  }

  async resetPassword(data: ResetPasswordRequest): Promise<Result<string>> {
    const user: IUserModel = await this._userRepository.findByCriteria({
      email: data.email,
      isEmailConfirmed: true
    });
    if (!user) return Result.fail<string>(400, "User not found");

    if (!user.passwordResetRequested) {
      return Result.fail<string>(
        400,
        "Invalid request, you have not requested password reset."
      );
    }
    user.password = data.newPassword;
    user.passwordResetRequested = false;
    user.save();
    return Result.ok<string>(200, "Password successfully reset");
  }
  async changePassword(data: ChangePasswordData): Promise<Result<boolean>> {
    // fetch user by id
    const user: IUserModel = await this._userRepository.findByCriteria({
      _id: data.userId,
      isEmailConfirmed: true
    });
    if (!user) return Result.fail<boolean>(400, "User not found");
    if (user._id !== data.userId)
      Result.fail<boolean>(
        403,
        "You are not authourized to make this request."
      );

    const passwordMatched: boolean = await user.comparePassword(
      data.oldPassword
    );
    if (!passwordMatched)
      return Result.fail<boolean>(400, "Password is incorrect.");

    user.password = data.newPassword;
    user.save();

    return Result.ok<bool>(200, true);
  }

  async resendVerificationLink(
    email: string,
    audience: string,
    verificationUrl: string
  ): Promise<Result<boolean>> {
    const user: IUserModel = await this._userRepository.findByCriteria({
      email
    });
    if (!user) {
      return Result.fail<boolean>(400, "Invalid username/password");
    }
    if (user.isEmailConfirmed)
      return Result.fail<boolean>(
        400,
        `${user.email} has already been verified.`
      );
    const data: TokenGenerationRequest = {
      user,
      audience,
      tokenExpiresIn: `${this._mailExpiratation}hr`,
      tokenType: TokenType.VERIFY,
      redirectUrl: verificationUrl
    };
    this.generateToken(data);
    return Result.ok<bool>(200, true);
  }

  private async generateToken(
    data: TokenGenerationRequest
  ): Promise<TokenResult> {
    const tokenOptions: SignInOptions = {
      issuer: config.VERIFICATION_URI,
      audience: data.audience,
      expiresIn: data.tokenExpiresIn,
      algorithm: this._currentRsaAlgType,
      keyid: this._currentVerifyKey,
      subject: ""
    };
    const payload: ObjectKeyString = {
      type: data.tokenType,
      email: data.user.email
    };
    const privateKey: string = getSecretByKey(this._currentVerifyKey);
    return await data.user.generateToken(privateKey, tokenOptions, payload);
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
    if (!user) return Result.fail<IUserModel>(404, "User not found");
    const updateObj = await this._userRepository.update(user._id, item);
    return Result.ok<IUserModel>(200, updateObj);
  }

  async patch(id: string, item: any): Promise<Result<UserViewModel>> {
    const user = await this._userRepository.findById(id);
    if (!user) return Result.fail<UserViewModel>(404, "User not found");
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

  private TokenEmailKeyValue(
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
        key: PlaceHolderKey.VerifyToken,
        value: verificationUrl
      },
      {
        key: PlaceHolderKey.PlatformUrl,
        value: audience
      },
      {
        key: PlaceHolderKey.FullVerifyToken,
        value: verificationUrl
      }
    ];
  }

  // async fetchResourceByName(destinationUrl: string): Promise<IResource> {
  //   return await this._resourceRepository.findByCriteria({
  //     name: destinationUrl
  //   });
  // }

  async fetchPermissionsByRole(role: string): Promise<IRolePermission[]> {
    return await this._rolePermissionRepository.populateFetch("permission", {
      role
    });
  }
}

Object.seal(UserBusiness);
export = UserBusiness;
