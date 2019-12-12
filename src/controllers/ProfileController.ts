import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  patch,
  requestValidators,
  get,
  use
} from "../decorators";
import IBaseController from "./interfaces/base/BaseController";
import ProfileRepository = require("../app/repository/ProfileRepository");
import UserRepository = require("../app/repository/UserRepository");

import { IProfile } from "../app/models/interfaces";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import ProfileBusiness = require("../app/business/ProfileBusiness");
import { PlatformError } from "../utils/error";
import { requireAuth } from "../middlewares/auth";

@controller("/v1/profiles")
export class ProfileController {
  @use(requireAuth)
  @get("/")
  async fetch(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      let condition = {};
      if (req.body) {
        condition = req.body;
      }
      const userTypeBusiness = new ProfileBusiness();
      const result = await userTypeBusiness.fetch(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again."
        })
      );
    }
  }

  @use(requireAuth)
  @get("/user")
  async fetchUserProfile(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userTypeBusiness = new ProfileBusiness();
      const result = await userTypeBusiness.findByUser(req.user);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again."
        })
      );
    }
  }

  @get("/:id")
  async fetchProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userTypeBusiness = new ProfileBusiness();
      const result = await userTypeBusiness.fetch({});
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again."
        })
      );
    }
  }

  @post("/")
  @requestValidators("phoneNumbers", "location", "categories")
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      // const userId: string = req.user;
      // const userModel: IUserModel = await new UserRepository().userTypeByUser(
      //   userId
      // );
      // if (!userModel.userType.name)
      //   return next(
      //     new RecordNotFound(`User with id ${userId} not found`, 404)
      //   );
      // // validate categories sent by user
      // const profile: IProfile = req.body;
      // for (let item of profile.categories) {
      //   const categoryModel = await new CategoryRepository().findById(item._id);
      //   if (!categoryModel)
      //     return next(
      //       new RecordNotFound(`Invalid category of id ${item}`, 404)
      //     );
      // }
      // switch (userModel.userType.name) {
      //   case UserTypes.TALENT:
      //     const talentModel = await new TalentRepository().break;
      //   case UserTypes.PROFESSIONAL:
      //     break;
      //   default:
      //     break;
      // }
    } catch (err) {
      //next(new InternalServerError('Internal Server error occured', 500));
    }
  }

  update(): void {}
  delete(): void {}
  findById(): void {}
}
