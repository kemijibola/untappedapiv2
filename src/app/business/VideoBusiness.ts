import VideoRepository from '../repository/VideoRepository';
import IVideoBusiness = require('./interfaces/VideoBusiness');
import { IVideo } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';
import { Result } from '../../utils/Result';

class VideoBusiness implements IVideoBusiness {
  private _videoRepository: VideoRepository;

  constructor() {
    this._videoRepository = new VideoRepository();
  }

  async fetch(): Promise<Result<IVideo>> {
    try {
      const videos = await this._videoRepository.fetch();
      return Result.ok<IVideo>(200, videos);
    } catch (err) {
      return Result.fail<IVideo>(500, `Internal server error occured. ${err}`);
    }
  }

  async findById(id: string): Promise<Result<IVideo>> {
    try {
      const video = await this._videoRepository.findById(id);
      if (!video._id)
        return Result.fail<IVideo>(404, `Video of Id ${id} not found`);
      else return Result.ok<IVideo>(200, video);
    } catch (err) {
      return Result.fail<IVideo>(500, `Internal server error occured. ${err}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IVideo>> {
    try {
      const video = await this._videoRepository.findByCriteria(criteria);
      if (!video._id) return Result.fail<IVideo>(404, `Video not found`);
      else return Result.ok<IVideo>(200, video);
    } catch (err) {
      return Result.fail<IVideo>(500, `Internal server error occured. ${err}`);
    }
  }

  async create(item: IVideo): Promise<Result<IVideo>> {
    try {
      const newVideo = await this._videoRepository.create(item);
      return Result.ok<IVideo>(201, newVideo);
    } catch (err) {
      return Result.fail<IVideo>(500, `Internal server error occured. ${err}`);
    }
  }

  async update(id: string, item: IVideo): Promise<Result<IVideo>> {
    try {
      const video = await this._videoRepository.findById(id);
      if (!video._id)
        return Result.fail<IVideo>(
          404,
          `Could not update video.Video of Id ${id} not found`
        );
      const updateObj = await this._videoRepository.update(video._id, item);
      return Result.ok<IVideo>(200, updateObj);
    } catch (err) {
      return Result.fail<IVideo>(500, `Internal server error occured. ${err}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._videoRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(VideoBusiness);
export = VideoBusiness;
