import VideoRepository from '../repository/VideoRepository';
import IVideoBusiness = require('./interfaces/VideoBusiness');
import { IVideo, ApprovalOperations, IApproval } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { schedule } from '../../utils/TaskScheduler';
import { StateMachineArns } from '../models/interfaces/custom/StateMachineArns';

class VideoBusiness implements IVideoBusiness {
  private _videoRepository: VideoRepository;

  constructor() {
    this._videoRepository = new VideoRepository();
  }

  // TODO:: ensure soft delete on all media items: Audio, Image and Video
  async fetch(condition: any): Promise<Result<IVideo[]>> {
    try {
      condition.isApproved = true;
      condition.isDeleted = false;
      const videos = await this._videoRepository.fetch(condition);
      return Result.ok<IVideo[]>(200, videos);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IVideo>> {
    try {
      if (!id) return Result.fail<IVideo>(400, 'Bad request');
      const criteria = {
        id,
        isApproved: true,
        isDeleted: false
      };
      const video = await this._videoRepository.findByIdCriteria(criteria);
      if (!video)
        return Result.fail<IVideo>(404, `Video of Id ${id} not found`);
      else return Result.ok<IVideo>(200, video);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IVideo>> {
    try {
      if (!condition) return Result.fail<IVideo>(400, 'Bad request');
      condition.isApproved = true;
      condition.isDeleted = false;
      const video = await this._videoRepository.findByOne(condition);
      if (!video) return Result.fail<IVideo>(404, `Video not found`);
      else return Result.ok<IVideo>(200, video);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IVideo>> {
    try {
      if (!criteria) return Result.fail<IVideo>(400, 'Bad request');
      criteria.isApproved = true;
      criteria.isDeleted = false;
      const video = await this._videoRepository.findByCriteria(criteria);
      if (!video) return Result.fail<IVideo>(404, `Video not found`);
      else return Result.ok<IVideo>(200, video);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IVideo): Promise<Result<any>> {
    try {
      item.isApproved = false;
      item.isDeleted = false;
      const newVideo = await this._videoRepository.create(item);

      // create approval request

      const approvalRequest: IApproval = Object.assign({
        entity: newVideo._id,
        operation: ApprovalOperations.VideoUpload,
        application: 'untappedpool.com'
      });
      await schedule(
        StateMachineArns.MediaStateMachine,
        newVideo.createdAt,
        approvalRequest
      );
      return Result.ok<boolean>(201, true);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IVideo): Promise<Result<IVideo>> {
    try {
      const video = await this._videoRepository.findById(id);
      if (!video)
        return Result.fail<IVideo>(
          404,
          `Could not update video.Video with Id ${id} not found`
        );
      item.isApproved = video.isApproved;
      item.isDeleted = video.isDeleted;
      const updateObj = await this._videoRepository.update(video._id, item);
      return Result.ok<IVideo>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._videoRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(VideoBusiness);
export = VideoBusiness;
