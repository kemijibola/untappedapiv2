import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  put,
  del,
  patch,
  authorize,
} from "../decorators";
import MediaBusiness = require("../app/business/MediaBusiness");
import {
  IMedia,
  MediaType,
  MediaUploadType,
  IAudio,
  IImage,
  IVideo,
  IMediaItem,
} from "../app/models/interfaces";
import { PlatformError } from "../utils/error";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requireAuth } from "../middlewares/auth";
import uuid = require("uuid");
import { requestValidator } from "../middlewares/ValidateRequest";
import {
  canViewPendingMedia,
  canApproveMedia,
  canRejectMedia,
} from "../utils/lib/PermissionConstant";

@controller("/v1/media")
export class MediaController {
  @use(requireAuth)
  @use(requestValidator)
  @put("/:id")
  @requestValidators("mediaType")
  async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      let uploadType: string = "";
      if (req.body.items) {
        uploadType = req.body.items.length > 1 ? "multiple" : "single";
      }
      const mediaType: string = req.body.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType",
          })
        );
      }

      req.body.uploadType = uploadType;
      req.body.mediaType = mediaType;
      const update: IMedia = req.body;

      update.user = req.user;

      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.update(req.params.id, update);
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
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @use(requireAuth)
  @use(requestValidator)
  @patch("/:id")
  async patchMedia(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const updateObj: IMedia = req.body;
      updateObj.user = req.user;

      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.updateExistingMedia(
        req.params.id,
        updateObj
      );
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
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @use(requireAuth)
  @post("/")
  @use(requestValidator)
  @requestValidators("title", "items", "mediaType")
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (req.body.items.length < 1) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide at least 1 media to upload in items",
          })
        );
      }
      const uploadType = req.body.items.length > 1 ? "multiple" : "single";

      const mediaType: string = req.body.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType",
          })
        );
      }

      const modifiedItems = req.body.items.reduce(
        (theMap: IMediaItem[], theItem: any) => {
          const item: IMediaItem = {
            path: theItem.path,
            isApproved: false,
            isDeleted: false,
          };
          theMap = [...theMap, item];
          return theMap;
        },
        []
      );
      req.body.items = [...modifiedItems];
      req.body.uploadType = uploadType;
      req.body.mediaType = mediaType;
      const newMedia: IMedia = req.body;
      newMedia.user = req.user;

      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.create(newMedia);
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
      //       console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @get("/me/preview")
  @use(requestValidator)
  @use(requireAuth)
  async fetchUserPreviewList(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.query.mediaType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide mediaType in query param",
          })
        );
      }
      if (!req.query.uploadType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide uploadType in query param",
          })
        );
      }

      const uploadType: string = req.query.uploadType.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType) && uploadType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType",
          })
        );
      }

      const mediaType: string = req.query.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType",
          })
        );
      }

      let condition: any = {
        isDeleted: false,
      };
      if (uploadType !== "all") {
        condition.uploadType = uploadType;
      }
      if (mediaType !== "all") {
        condition.mediaType = mediaType;
      }

      condition.user = req.user;

      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.fetchPreview(condition);

      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured, ${result.error}`,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data,
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later",
        })
      );
    }
  }

  @get("/talent/:id/portfolio")
  @use(requestValidator)
  async fetchPreviewList(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.mediaType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide mediaType in query param",
          })
        );
      }
      if (!req.query.uploadType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide uploadType in query param",
          })
        );
      }

      const uploadType: string = req.query.uploadType.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType) && uploadType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType",
          })
        );
      }

      const mediaType: string = req.query.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType",
          })
        );
      }

      let condition: any = {
        isDeleted: false,
      };
      if (uploadType !== "all") {
        condition.uploadType = uploadType;
      }
      if (mediaType !== "all") {
        condition.mediaType = mediaType;
      }

      condition.user = req.params.id;
      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.fetchTalentPortfolioPreview(condition);

      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured, ${result.error}`,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data,
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later",
        })
      );
    }
  }

  @get("/me")
  @use(requestValidator)
  @use(requireAuth)
  async fetchUserList(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.query.mediaType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide mediaType in query param",
          })
        );
      }
      if (!req.query.uploadType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide uploadType in query param",
          })
        );
      }

      const uploadType: string = req.query.uploadType.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType) && uploadType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType",
          })
        );
      }

      const mediaType: string = req.query.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType",
          })
        );
      }

      let condition: any = {
        isDeleted: false,
      };
      if (uploadType !== "all") {
        condition.uploadType = uploadType;
      }
      if (mediaType !== "all") {
        condition.mediaType = mediaType;
      }

      condition.user = req.user;

      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.fetch(condition);

      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured, ${result.error}`,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data,
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later",
        })
      );
    }
  }

  @get("/")
  @use(requestValidator)
  async fetchList(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.mediaType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide mediaType in query param",
          })
        );
      }
      if (!req.query.uploadType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide uploadType in query param",
          })
        );
      }

      const uploadType: string = req.query.uploadType.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType",
          })
        );
      }

      const mediaType: string = req.query.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType",
          })
        );
      }

      let condition: any = {
        isDeleted: false,
      };
      if (uploadType !== "all") {
        condition.uploadType = uploadType;
      }

      if (mediaType !== "all") {
        condition.mediaType = mediaType;
      }

      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.fetch(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured, ${result.error}`,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }

  @get("/admin/pending")
  @use(requireAuth)
  @use(requestValidator)
  @authorize(canViewPendingMedia)
  async fetchPendingMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.fetchMediaPendingApproval({});
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured, ${result.error}`,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }

  @use(requestValidator)
  @get("/:id")
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const mediaBusiness = new MediaBusiness();
      let condition: any = {
        _id: req.params.id,
        isDeleted: false,
      };
      const result = await mediaBusiness.findMedia(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }

  @use(requestValidator)
  @use(requireAuth)
  @del("/:id")
  async deleteMedia(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const mediaBusiness = new MediaBusiness();
      // fetch media by id
      const media = await mediaBusiness.findById(req.params.id);
      if (media.error) {
        return next(
          new PlatformError({
            code: media.responseCode,
            message: media.error,
          })
        );
      }
      if (media.data) {
        if (media.data.user != req.user) {
          return next(
            new PlatformError({
              code: 403,
              message: "You are not authorized to perform this request.",
            })
          );
        }

        const result = await mediaBusiness.delete(media.data._id);
        if (result.error) {
          return next(
            new PlatformError({
              code: result.responseCode,
              message: result.error,
            })
          );
        }
        return res.status(result.responseCode).json({
          message: "Media Operation successful",
          data: result.data,
        });
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }

  @use(requestValidator)
  @use(requireAuth)
  @del("/:id/item/:itemId")
  async deleteMediaItem(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mediaBusiness = new MediaBusiness();
      const media = await mediaBusiness.findById(req.params.id);
      if (media.error) {
        return next(
          new PlatformError({
            code: media.responseCode,
            message: media.error,
          })
        );
      }
      if (media.error) {
        return next(
          new PlatformError({
            code: media.responseCode,
            message: media.error,
          })
        );
      }

      if (media.data) {
        var mediaUser: string = media.data.user;
        var currentUser: string = req.user;

        if (mediaUser != currentUser) {
          return next(
            new PlatformError({
              code: 403,
              message: "You are not authorized to perform this request.",
            })
          );
        }

        const result = await mediaBusiness.deleteMediaItem(
          media.data._id,
          req.params.itemId
        );
        if (result.error) {
          return next(
            new PlatformError({
              code: result.responseCode,
              message: result.error,
            })
          );
        }
        return res.status(result.responseCode).json({
          message: "Media Operation successful",
          data: result.data,
        });
      }
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }

  @put("/admin/approve/:id")
  @use(requireAuth)
  @use(requestValidator)
  @authorize(canApproveMedia)
  @requestValidators("itemId")
  async approveMediaItem(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mediaBusiness = new MediaBusiness();
      if (!req.body.itemId)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide itemId",
          })
        );

      const result = await mediaBusiness.approveMedia(
        req.params.id,
        req.body.itemId,
        req.user
      );
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
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @put("/admin/reject/:id")
  @use(requireAuth)
  @use(requestValidator)
  @authorize(canRejectMedia)
  @requestValidators("reason")
  async rejectMediaItem(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.body.itemId)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide itemId",
          })
        );
      if (!req.body.reason)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide rejection reason",
          })
        );
      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.rejectMedia(
        req.params.id,
        req.body.itemId,
        req.user,
        req.body.reason
      );
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
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }
}
