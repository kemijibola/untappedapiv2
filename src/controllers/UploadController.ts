import { Request, Response, NextFunction } from "express";
import { controller, post, requestValidators, get, use } from "../decorators";
import { PlatformError } from "../utils/error";
import {
  IUploadFileRequest,
  UPLOADOPERATIONS
} from "../utils/uploadservice/Helper/Upload";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { FileUpload } from "../utils/uploadservice/FileUpload";
import { S3Storage } from "../utils/uploadservice/storage/S3Storage";
import { requireAuth } from "../middlewares/auth";
import { Uploader, AbstractMedia } from "../utils/uploads/Uploader";
import { MediaMakerFactory } from "../utils/uploads/MediaMakerFactory";

@controller("/v1/uploads")
export class UploadController {
  @post("/")
  @requestValidators("action", "files", "mediaType")
  @use(requireAuth)
  async getPresignedUrl(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const action: UPLOADOPERATIONS = req.body.action;
      if (!UPLOADOPERATIONS[action]) {
        return next(
          new PlatformError({
            code: 400,
            message: "action is invalid."
          })
        );
      }

      if (req.body.files.length < 1) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide at least 1 item in files for upload."
          })
        );
      }
      const item: IUploadFileRequest = req.body;
      item.uploader = req.user;

      var mediaFactory: AbstractMedia = new MediaMakerFactory().create(
        item.mediaType.toLowerCase()
      );
      const result = await mediaFactory.getPresignedUrl(item);
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
      if (err.code === 400) {
        return next(
          new PlatformError({
            code: err.code,
            message: err.message
          })
        );
      }
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}
