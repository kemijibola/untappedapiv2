import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  patch,
  requestValidators,
  get,
  use,
  put,
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
import * as _ from "underscore";

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
            message: result.error,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }

  @get("/")
  @use(requestValidator)
  async fetchTalents(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }

  @get("/user")
  @use(requestValidator)
  @use(requireAuth)
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
            message: result.error,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
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
            message: result.error,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }

  @use(requireAuth)
  @use(requestValidator)
  @post("/")
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IProfile = req.body;
      if (_.has(req.body.userAddress, "address")) {
        item.location = req.body.userAddress.address.location;
        item.formattedAddres = req.body.userAddress.address.formattedAddres;
      }
      item.user = req.user;
      const profileBusiness = new ProfileBusiness();
      const result = await profileBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }

  @use(requestValidator)
  @use(requireAuth)
  @put("/:id")
  async updateProfile(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IProfile = req.body;
      item.user = req.user;
      const id = req.params.id;
      if (_.has(req.body.userAddress, "address")) {
        item.location = req.body.userAddress.address.location;
        item.formattedAddres = req.body.userAddress.address.formattedAddres;
      }
      const profileBusiness = new ProfileBusiness();
      const result = await profileBusiness.patch(id, item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }

  @post("/talent/like")
  @use(requestValidator)
  @requestValidators("userId")
  @use(requireAuth)
  async postTalentLike(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.body.userId)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide userId",
          })
        );
      const profileBusiness = new ProfileBusiness();
      console.log("from controller", req.body.userId);
      const talentProfile = await profileBusiness.findByCriteria({
        user: req.body.userId,
      });
      if (talentProfile.error) {
        return next(
          new PlatformError({
            code: talentProfile.responseCode,
            message: talentProfile.error,
          })
        );
      }
      if (talentProfile.data) {
        const userHasLiked = talentProfile.data.tappedBy.filter(
          (x) => x == req.user
        )[0];
        if (userHasLiked) {
          return next(
            new PlatformError({
              code: 400,
              message: "You have already performed Like operation.",
            })
          );
        }
        talentProfile.data.tappedBy = [
          ...talentProfile.data.tappedBy,
          req.user,
        ];
        const result = await profileBusiness.updateLike(
          talentProfile.data._id,
          talentProfile.data
        );
        if (result.error) {
          return next(
            new PlatformError({
              code: result.responseCode,
              message: result.error,
            })
          );
        }
        return res.status(200).json({
          message: "Operation successful",
          data: true,
        });
      }
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/talent/unLike")
  @use(requestValidator)
  @requestValidators("userId")
  @use(requireAuth)
  async postTalentUnLike(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.body.userId)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide userId",
          })
        );
      const profileBusiness = new ProfileBusiness();
      const talentProfile = await profileBusiness.findByCriteria({
        user: req.body.userId,
      });
      if (talentProfile.error) {
        return next(
          new PlatformError({
            code: talentProfile.responseCode,
            message: talentProfile.error,
          })
        );
      }
      if (talentProfile.data) {
        const userHasLiked = talentProfile.data.tappedBy.filter(
          (x) => x == req.user
        )[0];
        if (!userHasLiked) {
          return next(
            new PlatformError({
              code: 400,
              message: "You have not liked talent",
            })
          );
        }

        talentProfile.data.tappedBy = talentProfile.data.tappedBy.filter(
          (x) => x != req.user
        );

        const result = await profileBusiness.updateLike(
          talentProfile.data._id,
          talentProfile.data
        );
        if (result.error) {
          return next(
            new PlatformError({
              code: result.responseCode,
              message: result.error,
            })
          );
        }
        return res.status(200).json({
          message: "Operation successful",
          data: true,
        });
      }
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }
}
