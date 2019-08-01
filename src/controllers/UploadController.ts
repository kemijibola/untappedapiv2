import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators, get } from '../decorators';
import { PlatformError } from '../utils/error';
import { IUploadFileRequest } from '../utils/uploadservice/Helper/Upload';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';
import { FileUpload } from '../utils/uploadservice/FileUpload';
import { S3Storage } from '../utils/uploadservice/storage/S3Storage';

@controller('/v1/uploads')
export class UploadController {
  @post('/')
  @requestValidators('action', 'files')
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IUploadFileRequest = req.body;
      // item.uploader = req.user || '8be9da14-6033-494a-908c-404b13558b15';
      item.uploader = '8be9da14-6033-494a-908c-404b13558b15';
      const uploader = FileUpload.uploader(new S3Storage());
      const result = await uploader.getPresignedUrls(item);

      if (result.error) {
        return next(
          PlatformError.error({
            code: result.responseCode,
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(201).json({
        message: 'Operation successful',
        data: result.data
      });
    } catch (err) {
      return next(
        PlatformError.error({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}
