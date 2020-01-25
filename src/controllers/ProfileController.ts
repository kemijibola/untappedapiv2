import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  patch,
  requestValidators,
  get,
  use,
  put
} from "../decorators";
import IBaseController from "./interfaces/base/BaseController";
import ProfileRepository = require("../app/repository/ProfileRepository");
import UserRepository = require("../app/repository/UserRepository");

import { IProfile } from "../app/models/interfaces";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import ProfileBusiness = require("../app/business/ProfileBusiness");
import { PlatformError } from "../utils/error";
import { requireAuth } from "../middlewares/auth";
import { requestValidator } from "../middlewares/ValidateRequest";

@controller("/v1/profiles")
export class ProfileController {
  @use(requireAuth)
  @get("/")
  @use(requestValidator)
  async fetch(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      let condition = {};
      if (req.body) {
        condition = req.body;
      }
      const profileBusiness = new ProfileBusiness();
      const result = await profileBusiness.fetch(condition);
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
  @use(requestValidator)
  async fetchUserProfile(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const profileBusiness = new ProfileBusiness();
      const result = await profileBusiness.findByUser(req.user);
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
  @use(requestValidator)
  async fetchProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profileBusiness = new ProfileBusiness();
      const result = await profileBusiness.fetch({});
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
  @post("/")
  @requestValidators()
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IProfile = req.body;
      item.user = req.user;
      console.log("post operation");
      const profileBusiness = new ProfileBusiness();
      const result = await profileBusiness.create(item);
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
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again."
        })
      );
    }
  }

  @use(requireAuth)
  @put("/:id")
  async updateProfile(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IProfile = req.body;
      item.user = req.user;
      const id = req.params.id;
      const profileBusiness = new ProfileBusiness();
      const result = await profileBusiness.patch(id, item);
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

  delete(): void {}
  findById(): void {}
}
