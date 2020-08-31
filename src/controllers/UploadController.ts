import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  authorize,
} from "../decorators";
import { PlatformError } from "../utils/error";
import {
  IUploadFileRequest,
  UPLOADOPERATIONS,
} from "../utils/uploadservice/Helper/Upload";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { FileUpload } from "../utils/uploadservice/FileUpload";
import { S3Storage } from "../utils/uploadservice/storage/S3Storage";
import { requireAuth } from "../middlewares/auth";
import { Uploader, AbstractMedia } from "../utils/uploads/Uploader";
import { MediaMakerFactory } from "../utils/uploads/MediaMakerFactory";
import { requestValidator } from "../middlewares/ValidateRequest";
import {
  canUploadProfileImage,
  canUploadGigs,
} from "../utils/lib/PermissionConstant";
import { MediaType } from "../app/models/interfaces";

@controller("/v1/uploads")
export class UploadController {
  @post("/")
  @use(requestValidator)
  @requestValidators("component", "files", "mediaType")
  @use(requireAuth)
  @authorize(canUploadGigs, canUploadProfileImage)
  async getPresignedUrl(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const action: UPLOADOPERATIONS = req.body.component;
      if (!UPLOADOPERATIONS[action]) {
        return next(
          new PlatformError({
            code: 400,
            message: "component is invalid.",
          })
        );
      }

      const mediaType: string = req.body.mediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType) || mediaType === "all") {
        return next(
          new PlatformError({
            code: 400,
            message: "Invalid mediaType",
          })
        );
      }

      if (req.body.files.length < 1) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide at least 1 item in files for upload.",
          })
        );
      }
      const item: IUploadFileRequest = req.body;
      item.action = action;
      item.uploader = req.user;
      var mediaFactory: AbstractMedia = new MediaMakerFactory().create(
        item.mediaType.toLowerCase()
      );

      const result = await mediaFactory.getPresignedUrl(item);
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
      if (err.code === 400) {
        return next(
          new PlatformError({
            code: err.code,
            message: err.message,
          })
        );
      }
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/uploads/thumbnail")
  @use(requestValidator)
  @requestValidators("encodedImage")
  @use(requireAuth)
  @authorize(canUploadGigs, canUploadProfileImage)
  async getThumbNailPresignedUrl(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("called");
      if (req.body.encodedImage.length < 1) {
        return next(
          new PlatformError({
            code: 400,
            message: "encodedImage is invalid.",
          })
        );
      }

      var mediaFactory: AbstractMedia = new MediaMakerFactory().create("image");
      const result = await mediaFactory.getThumbNailUrl(
        req.user,
        req.body.encodedImage
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
      if (err.code === 400) {
        return next(
          new PlatformError({
            code: err.code,
            message: err.message,
          })
        );
      }
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }
}
