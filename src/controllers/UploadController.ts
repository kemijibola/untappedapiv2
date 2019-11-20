import { Request, Response, NextFunction } from "express";
import { controller, post, requestValidators, get, use } from "../decorators";
import { PlatformError } from "../utils/error";
import { IUploadFileRequest } from "../utils/uploadservice/Helper/Upload";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { FileUpload } from "../utils/uploadservice/FileUpload";
import { S3Storage } from "../utils/uploadservice/storage/S3Storage";
import { requireAuth } from "../middlewares/auth";

@controller("/v1/uploads")
export class UploadController {
  @post("/")
  @requestValidators("action", "files")
  @use(requireAuth)
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IUploadFileRequest = req.body;
      item.uploader = req.user;
      const uploader = FileUpload.uploader(new S3Storage());
      const result = await uploader.getPresignedUrls(item);

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
