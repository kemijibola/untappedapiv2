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
import {
  audioExtentions,
  videoExtensions,
  imageExtensions,
  ObjectKeyString,
} from "../utils/lib";
import { PlatformError } from "../utils/error";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requireAuth } from "../middlewares/auth";
import uuid = require("uuid");
import { requestValidator } from "../middlewares/ValidateRequest";

// SAMPLE GET ROUTE:: http://localhost:9000?user=1234&medias?type=all&upload=single
// SAMPLE GET ROUTE:: http://localhost:9000?user=1234&medias?type=all&upload=all
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=videos&upload=single
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=images&upload=all
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=audios&upload=multiple

// SAMPLE POST ROUTE:: http://localhost:8900/medias?type=audio
// SAMPLE PUT ROUTE:: http://localhost:8900/medias/:id?type=audio
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
      console.log(updateObj);
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
      console.log(newMedia);
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

  // SAMPLE GET USER MEDIA LIST ROUTE:: http://localhost:8900/medias?mediaType=audio&uploadType=all
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

      console.log("line 263", condition);
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

  // SAMPLE GET USER MEDIA LIST ROUTE:: http://localhost:8900/medias?mediaType=audio&uploadType=all
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
      console.log(uploadType);
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

  // SAMPLE GET USER MEDIA LIST ROUTE:: http://localhost:8900/medias?mediaType=audio&uploadType=all
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

  // SAMPLE GET ALL LIST ROUTE:: http://localhost:8900/medias?type=audio&upload_type=all
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

  // SAMPLE GET SINGLE MEDIA ROUTE:: http://localhost:8900/medias/:id
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
}
