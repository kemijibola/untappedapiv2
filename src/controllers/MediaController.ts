import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators, get } from '../decorators';
import AudioBusiness = require('../app/business/AudioBusiness');
import VideoBusiness = require('../app/business/VideoBusiness');
import ImageBusiness = require('../app/business/ImageBusiness');
import {
  IMedia,
  MediaType,
  MediaUploadType,
  IAudio
} from '../app/models/interfaces';
import {
  audioExtentions,
  videoExtensions,
  imageExtensions,
  ObjectKeyString
} from '../utils/lib';
import { PlatformError } from '../utils/error';

// SAMPLE GET ROUTE:: http://localhost:9000?user=1234&medias?type=all&upload=single
// SAMPLE GET ROUTE:: http://localhost:9000?user=1234&medias?type=all&upload=all
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=videos&upload=single
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=images&upload=all
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=audios&upload=multiple

// SAMPLE POST ROUTE:: http://localhost:8900/medias?type=audio
@controller('/v1/medias')
export class MediaController {
  @post('/')
  @requestValidators('title', 'items', 'uploadType')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request. Parameter 'type' is missing in query`
          })
        );
      }
      // TODO:: get current user id here
      const mediaType = req.query.type.toLowerCase();
      switch (mediaType) {
        case MediaType.audio:
          const item: IAudio = req.body;
          const audioBusiness = new AudioBusiness();
          const audioResult = await audioBusiness.create(item);
          if (audioResult.error) {
            return next(
              new PlatformError({
                code: audioResult.responseCode,
                message: `Error occured. ${audioResult.error}`
              })
            );
          }
          return res.status(audioResult.responseCode).json({
            message: 'Operation successful',
            data: audioResult.data
          });
      }
    } catch (err) {
      // next(new InternalServerError('Internal Server error occured', 500));
    }
  }
  update(): void {}
  delete(): void {}

  @get('/')
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      // audio, video, image, general
      // if media = audio then fetch from audioCollection
      // uploadType = all, set uploadType=''
      // with uploadType and userId, set up condition

      // SAMPLE QUERY REQUEST

      // TODO:: http://localhost:9000?user=1234&medias?type=all&upload=single
      // TODO:: http://localhost:9000?user=1234&medias?type=all&upload=all
      // TODO:: http://localhost:9000?medias?type=videos&upload=single
      // TODO:: http://localhost:9000?medias?type=images&upload=all
      // TODO:: http://localhost:9000?medias?type=audios&upload=multiple

      if (!req.query.type) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request. Parameter 'type' is missing in query`
          })
        );
      }
      if (!req.query.upload) {
        return next(
          new PlatformError({
            code: 400,
            message: `Bad request.Parameter 'upload' is missing in query`
          })
        );
      }
      const mediaType = req.query.type.toLowerCase();
      let condition: ObjectKeyString = {};
      const upload = req.query.upload.toLowerCase();
      // condition.uploadType = MediaUploadType[upload];
      if (condition['upload'] === MediaUploadType.all) {
        condition.uploadType = '';
      }
      if (req.query.userId) {
        condition.user = req.query.userId;
      }
      switch (mediaType) {
        case MediaType.audio:
          const audioBusiness = new AudioBusiness();
          const audioResult = await audioBusiness.fetch(condition);
          if (audioResult.error) {
            return next(
              new PlatformError({
                code: audioResult.responseCode,
                message: `Error occured. ${audioResult.error}`
              })
            );
          }
          return res.status(audioResult.responseCode).json({
            message: 'Audio Operation successful',
            data: audioResult.data
          });
        case MediaType.image:
          const imageBusiness = new ImageBusiness();
          const imageResult = await imageBusiness.fetch(condition);
          if (imageResult.error) {
            return next(
              new PlatformError({
                code: imageResult.responseCode,
                message: `Error occured. ${imageResult.error}`
              })
            );
          }
          return res.status(imageResult.responseCode).json({
            message: 'Operation successful',
            data: imageResult.data
          });
        case MediaType.video:
          const videoBusiness = new VideoBusiness();
          const videoResult = await videoBusiness.fetch(condition);
          if (videoResult.error) {
            return next(
              new PlatformError({
                code: videoResult.responseCode,
                message: `Error occured. ${videoResult.error}`
              })
            );
          }
          return res.status(videoResult.responseCode).json({
            message: 'Operation successful',
            data: videoResult.data
          });
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }

  @get('/:id')
  findById(req: Request, res: Response, next: NextFunction) {}
}
