import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import AudioRepository = require('../app/repository/AudioRepository');
import VideoRepository = require('../app/repository/VideoRepository');
import ImageRepository = require('../app/repository/ImageRepository');
import { IMedia } from '../app/models/interfaces';
import {
  audioExtentions,
  videoExtensions,
  imageExtensions
} from '../utils/lib';

// TODO:: http://localhost:9000?user=1234&medias?type=all&upload=single
// TODO:: http://localhost:9000?user=1234&medias?type=all&upload=all
// TODO:: http://localhost:9000?medias?type=videos&upload=single
// TODO:: http://localhost:9000?medias?type=images&upload=all
// TODO:: http://localhost:9000?medias?type=audios&upload=multiple
@controller('/v1/medias')
class MediaController {
  @post('/')
  @requestValidators('title', 'items')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // let criteria: { $and: any; $or: any } = {
      //   $and: null,
      //   $or: null
      // };
      // const item: IMedia = req.body;
      // const [_, fileExtension] = item.items[0].path.split('.');
      // if (audioExtentions.includes(fileExtension)) {
      //   const audioModel = await new AudioRepository().findByCriteria({
      //     title: item.title.toLowerCase()
      //   });
      //   if (audioModel.title)
      //     return next(
      //       new RecordExists(`Audio title: ${item.title} exists`, 400)
      //     );
      //   const audio = await new AudioRepository().create(item);
      //   return res.status(201).json({
      //     message: 'Operation successful',
      //     data: audio
      //   });
      // } else if (videoExtensions.includes(fileExtension)) {
      //   const videoModel = await new VideoRepository().findByCriteria({
      //     title: item.title.toLowerCase()
      //   });
      //   if (videoModel.title)
      //     next(new RecordExists(`Video title: ${item.title} exists`, 400));
      //   const video = await new VideoRepository().create(item);
      //   return res.status(201).json({
      //     message: 'Operational successful',
      //     data: video
      //   });
      // } else if (imageExtensions.includes(fileExtension)) {
      //   const imageModel = await new ImageRepository().findByCriteria({
      //     title: item.title.toLowerCase()
      //   });
      //   if (imageModel)
      //     next(new RecordExists(`Image title: ${item.title} exists`, 400));
      //   const image = await new ImageRepository().create(item);
      //   return res.status(201).json({
      //     message: 'Operation successful',
      //     data: image
      //   });
      // } else {
      //   return next(
      //     new InvalidContent(`${fileExtension} is not a supported format`, 400)
      //   );
      // }
    } catch (err) {
      // next(new InternalServerError('Internal Server error occured', 500));
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}
