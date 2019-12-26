import UserRepository from "../repository/UserRepository";
import RoleRepository from "../repository/RoleRepository";
import ScheduledEmailRepository from "../repository/ScheduledEmailRepository";
import ResourceRepository from "../repository/ResourceRepository";
import PermissionRepository from "../repository/PermissionRepository";
import IUserBusiness = require("./interfaces/UserBusiness");
import {
  IUserModel,
  IAuthData,
  ILogin,
  IRegister,
  IScheduledEmail,
  MailType,
  AuthPayload,
  IResource,
  IPermission,
  ImageEditRequest
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
import { WelcomeEmail } from "../../utils/emailtemplates";
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
  ResetPasswordData,
  TokenGenerationRequest
} from "../models/interfaces/custom/Account";
import UserTypeRepository from "../repository/UserTypeRepository";
import { AbstractMedia } from "../../utils/uploads/Uploader";
import { MediaMakerFactory } from "../../utils/uploads/MediaMakerFactory";

class UserBusiness implements IUserBusiness {
  private _currentAuthKey = "";
  private _currentVerifyKey = "";
  private _currentRsaAlgType = "";
  private _authExpiration = "";
  private _mailExpiratation = "";
  private _verifyExpiration = "";
  private _userRepository: UserRepository;
  private _userTypeRepository: UserTypeRepository;
  private _roleRepository: RoleRepository;
  private _scheduledEmailRepository: ScheduledEmailRepository;
  private _resourceRepository: ResourceRepository;
  private _permissionRepository: PermissionRepository;
  private chunkedUserPermissons: IPermission[] = [];

  constructor() {
    this._userRepository = new UserRepository();
    this._roleRepository = new RoleRepository();
    this._userTypeRepository = new UserTypeRepository();
    this._scheduledEmailRepository = new ScheduledEmailRepository();
    this._resourceRepository = new ResourceRepository();
    this._permissionRepository = new PermissionRepository();
    this._currentAuthKey = currentAuthKey;
    this._currentVerifyKey = currentVerifyKey;
    this._currentRsaAlgType = currentRsaAlgType;
    this._authExpiration = authExpiration;
    this._verifyExpiration = verifyTokenExpiration;
    this._mailExpiratation = mailExpiration;
  }

  async findUserByEmail(criteria: any): Promise<IUserModel> {
    return await this._userRepository.findByCriteria(criteria);
  }

  async login(params: ILogin): Promise<Result<IAuthData>> {
    {
      const criteria = {
        email: params.email.toLowerCase(),
        isEmailConfirmed: true
      };
      const user = await this.findUserByEmail(criteria);

      if (!user) return Result.fail<IAuthData>(404, "User not found.");

      const passwordMatched: boolean = await user.comparePassword(
        params.password
      );
      if (!passwordMatched)
        return Result.fail<IAuthData>(400, "Invalid credentials");

      if (!user.isEmailConfirmed)
        return Result.fail<IAuthData>(400, "Please verify your email.");

      for (let role of user.roles) {
        const permissions = await this.fetchPermissionsByRole(role);
        if (permissions) {
          this.chunkedUserPermissons.push(...permissions);
        }
      }

      const signInOptions: SignInOptions = {
        issuer: config.AUTH_ISSUER_SERVER,
        audience: params.audience,
        expiresIn: this._authExpiration,
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
          400,
          `Private Key is missing for ${this._currentAuthKey}`
        );
      }
      const userToken: TokenResult = await user.generateToken(
        privateKey,
        signInOptions,
        payload
      );

      if (userToken.error) return Result.fail<IAuthData>(400, "Invalid token.");
      const typeOfUser = await this._userTypeRepository.findById(user.userType);

      const authData: IAuthData = {
        access_token: userToken.data,
        permissions: this.chunkedUserPermissons,
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
      kid: this._currentVerifyKey,
      issuer: config.VERIFICATION_URI,
      email: request.userEmail,
      type: TokenType.VERIFY,
      audience: request.audience,
      keyid: this._currentVerifyKey,
      ignoreExpiration: false,
      maxAge: this._mailExpiratation
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

  async findById(id: string): Promise<Result<any>> {
    if (!id) return Result.fail<IUserModel>(400, "Bad request");
    const user = await this._userRepository.findById(id);
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
    console.log("got here");
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
      confirmationUrl: item.confirmationUrl
    };
    this.generateTokenAndSendToMail(data);
    return Result.ok<bool>(201, true);
  }

  async forgotPassword(
    email: string,
    audience: string,
    verificationUrl: string
  ): Promise<Result<boolean>> {
    const user: IUserModel = await this._userRepository.findByCriteria({
      email
    });
    if (user) {
      const request: TokenGenerationRequest = {
        user,
        audience,
        confirmationUrl: verificationUrl
      };
      this.generateTokenAndSendToMail(request);
    }
    return Result.ok<bool>(200, true);
  }

  async resetPassword(data: ResetPasswordData): Promise<Result<boolean>> {
    // fetch user by email
    const user: IUserModel = await this._userRepository.findByCriteria({
      _id: data.userId,
      isEmailConfirmed: true
    });
    if (!user) return Result.fail<boolean>(400, "User not found");
    const passwordMatched: boolean = await user.comparePassword(
      data.oldPassword
    );
    if (!passwordMatched)
      return Result.fail<boolean>(400, "Invalid credentials");

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
      return Result.fail<boolean>(400, "User not found");
    }
    if (user.isEmailConfirmed)
      return Result.fail<boolean>(
        400,
        `${user.email} has already been verified.`
      );
    const data: TokenGenerationRequest = {
      user,
      audience,
      confirmationUrl: verificationUrl
    };
    this.generateTokenAndSendToMail(data);
    return Result.ok<bool>(200, true);
  }

  private async generateTokenAndSendToMail(data: TokenGenerationRequest) {
    const tokenOptions: SignInOptions = {
      issuer: config.VERIFICATION_URI,
      audience: data.audience,
      expiresIn: this._mailExpiratation,
      algorithm: this._currentRsaAlgType,
      keyid: this._currentVerifyKey,
      subject: ""
    };
    const payload: ObjectKeyString = {
      type: TokenType.VERIFY,
      email: data.user.email
    };
    const privateKey: string = getSecretByKey(this._currentVerifyKey);
    if (privateKey == "")
      return Result.fail<boolean>(
        400,
        `Private Key is missing for ${this._currentVerifyKey}`
      );
    const generated: TokenResult = await data.user.generateToken(
      privateKey,
      tokenOptions,
      payload
    );

    if (generated.data) {
      const welcomeEmailKeyValues: TemplateKeyValue[] = this.welcomeEmailKeyValue(
        data.user.fullName,
        data.audience,
        `${data.confirmationUrl}?email=${data.user.email}&token=${generated.data}`
      );

      const welcomeTemplateString: string = WelcomeEmail.template;

      const welcomeEmailPlaceHolder: TemplatePlaceHolder = {
        template: welcomeTemplateString,
        placeholders: welcomeEmailKeyValues
      };

      const emailBody: string = replaceTemplateString(welcomeEmailPlaceHolder);
      const mailParams: IEmail = {
        receivers: [data.user.email],
        subject: "Signup Welcome Email",
        mail: emailBody,
        senderEmail: "talents@untappedpool.com",
        senderName: "Untapped Pool"
      };

      await schedule(
        StateMachineArns.EmailStateMachine,
        new Date(),
        mailParams
      );
    }
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
    console.log(item);
    console.log(id);
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

  async fetchResourceByName(destinationUrl: string): Promise<IResource> {
    return await this._resourceRepository.findByCriteria({
      name: destinationUrl
    });
  }

  async fetchPermissionsByRole(role: string): Promise<any> {
    return await this._permissionRepository.fetch({ role });
  }
}

Object.seal(UserBusiness);
export = UserBusiness;
