import VideoRepository from '../repository/VideoRepository';
import IVideoBusiness = require('./interfaces/VideoBusiness');
import { IVideo } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class VideoBusiness implements IVideoBusiness {
  private _videoRepository: VideoRepository;

  constructor() {
    this._videoRepository = new VideoRepository();
  }

  fetch(): Promise<IVideo> {
    return this._videoRepository.fetch();
  }

  findById(id: string): Promise<IVideo> {
    return this._videoRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IVideo> {
    return this.findByCriteria(criteria);
  }

  create(item: IVideo): Promise<IVideo> {
    return this._videoRepository.create(item);
  }

  async update(id: string, item: IVideo): Promise<IVideo> {
    const videoModel = await this._videoRepository.findById(id);
    if (!videoModel)
      throw new RecordNotFound(`Video with id: ${id} not found`, 404);
    return this._videoRepository.update(videoModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._videoRepository.delete(id);
  }
}

Object.seal(VideoBusiness);
export = VideoBusiness;
