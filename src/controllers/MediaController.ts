import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  put
} from "../decorators";
import MediaBusiness = require("../app/business/MediaBusiness");
import {
  IMedia,
  MediaType,
  MediaUploadType,
  IAudio,
  IImage,
  IVideo,
  IMediaItem
} from "../app/models/interfaces";
import {
  audioExtentions,
  videoExtensions,
  imageExtensions,
  ObjectKeyString
} from "../utils/lib";
import { PlatformError } from "../utils/error";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requireAuth } from "../middlewares/auth";
import uuid = require("uuid");

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
  @put("/:id")
  @requestValidators("title", "items", "uploadType", "mediaType")
  async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (req.body.items.length < 1) {
        return next(
          new PlatformError({
            code: 400,
            message: "Bad request. Parameter 'items' is missing in request body"
          })
        );
      }
      const uploadType: string = req.body.uploadType.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType"
          })
        );
      }

      const mediaType: string = req.body.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType"
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
            message: result.error
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @use(requireAuth)
  @post("/")
  @requestValidators("title", "items", "uploadType", "mediaType")
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (req.body.items.length < 1) {
        return next(
          new PlatformError({
            code: 400,
            message: "Bad request. Parameter 'items' is missing in request body"
          })
        );
      }
      const uploadType: string = req.body.uploadType.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType"
          })
        );
      }

      const mediaType: string = req.body.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType"
          })
        );
      }

      const modifiedItems = req.body.items.reduce(
        (theMap: IMediaItem[], theItem: any) => {
          const item: IMediaItem = {
            id: uuid(),
            path: theItem.path
          };
          theMap = [...theMap, item];
          return theMap;
        },
        []
      );
      req.body.items = [...modifiedItems];
      req.body.uploadType = uploadType;
      req.body.mediaType = mediaType;
      console.log("modified items", req.body.items);
      const newMedia: IMedia = req.body;
      newMedia.user = req.user;
      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.create(newMedia);
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
      console.log("error from controller", err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  // SAMPLE GET USER MEDIA LIST ROUTE:: http://localhost:8900/medias?type=audio&upload_type=all
  @post("/user")
  @use(requireAuth)
  async fetchUserList(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.query.type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request. Parameter 'type' is missing in query`
          })
        );
      }
      if (!req.query.upload_type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request.Parameter 'upload' is missing in query`
          })
        );
      }

      const uploadType: string = req.query.upload_type.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType) && uploadType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType"
          })
        );
      }

      const mediaType: string = req.query.type.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType"
          })
        );
      }

      let condition: ObjectKeyString = {};
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
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later"
        })
      );
    }
  }

  // SAMPLE GET ALL LIST ROUTE:: http://localhost:8900/medias?type=audio&upload_type=all
  @get("/")
  async fetchList(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request. Parameter 'type' is missing in query`
          })
        );
      }
      if (!req.query.upload_type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request.Parameter 'upload' is missing in query`
          })
        );
      }

      const uploadType: string = req.body.upload_type.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType"
          })
        );
      }

      const mediaType: string = req.body.type.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType"
          })
        );
      }

      let condition: ObjectKeyString = {};
      if (uploadType !== "all") {
        condition.uploadType = uploadType;
      }
      condition.mediaType = mediaType;
      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.fetch(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }

  // SAMPLE GET SINGLE MEDIA ROUTE:: http://localhost:8900/medias/:id?type=audio&upload_type=single
  @get("/:id")
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request. Parameter 'type' is missing in query`
          })
        );
      }
      if (!req.query.upload_type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request.Parameter 'upload' is missing in query`
          })
        );
      }

      const uploadType: string = req.body.upload_type.toLowerCase();
      const systemUploadTypes: string[] = Object.values(MediaUploadType);
      if (!systemUploadTypes.includes(uploadType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid uploadType"
          })
        );
      }

      const mediaType: string = req.body.type.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType"
          })
        );
      }

      let condition: ObjectKeyString = {};
      if (uploadType === MediaUploadType.all) {
        condition.uploadType = "";
      } else {
        condition.uploadType = uploadType;
      }
      condition.mediaType = mediaType;
      condition._id = req.params.id;
      const mediaBusiness = new MediaBusiness();
      const result = await mediaBusiness.findOne(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }
}
