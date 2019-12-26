import MediaRepository from "../repository/MediaRepository";
import IMediaBusiness = require("./interfaces/MediaBusiness");
import { ApprovalOperations, IApproval, IMedia } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { schedule } from "../../handlers/ScheduleTask";
import { StateMachineArns } from "../models/interfaces/custom/StateMachineArns";

class MediaBusiness implements IMediaBusiness {
  private _mediaRepository: MediaRepository;

  constructor() {
    this._mediaRepository = new MediaRepository();
  }

  // TODO:: ensure soft delete on all media items: Audio, Image and Video
  async fetch(condition: any): Promise<Result<IMedia[]>> {
    condition.isApproved = true;
    condition.isDeleted = false;
    const medias = await this._mediaRepository.fetch(condition);
    return Result.ok<IMedia[]>(200, medias);
  }

  async findById(id: string): Promise<Result<IMedia>> {
    if (!id) return Result.fail<IMedia>(400, "Bad request");
    const criteria = {
      id,
      isApproved: true,
      isDeleted: false
    };
    const media = await this._mediaRepository.findByIdCriteria(criteria);
    if (!media) return Result.fail<IMedia>(404, `Media of Id ${id} not found`);
    return Result.ok<IMedia>(200, media);
  }

  async findOne(condition: any): Promise<Result<IMedia>> {
    if (!condition) return Result.fail<IMedia>(400, "Bad request");
    condition.isApproved = true;
    condition.isDeleted = false;
    const media = await this._mediaRepository.findByOne(condition);
    if (!media) return Result.fail<IMedia>(404, `Media not found`);
    return Result.ok<IMedia>(200, media);
  }

  async findByCriteria(criteria: any): Promise<Result<IMedia>> {
    if (!criteria) return Result.fail<IMedia>(400, "Bad request");
    criteria.isApproved = true;
    criteria.isDeleted = false;
    const media = await this._mediaRepository.findByCriteria(criteria);
    if (!media) return Result.fail<IMedia>(404, `Media not found`);
    return Result.ok<IMedia>(200, media);
  }

  async create(item: IMedia): Promise<Result<any>> {
    item.activityCount = 0;
    item.isApproved = false;
    item.isDeleted = false;
    console.log(item);
    await this._mediaRepository.create(item);

    return Result.ok<boolean>(201, true);
  }

  async update(id: string, item: IMedia): Promise<Result<IMedia>> {
    const media = await this._mediaRepository.findById(id);
    if (!media)
      return Result.fail<IMedia>(
        404,
        `Could not update media.Media with Id ${id} not found`
      );
    item.isApproved = media.isApproved;
    item.isDeleted = media.isDeleted;
    item.updateAt = new Date();
    const updateObj = await this._mediaRepository.update(media._id, item);
    return Result.ok<IMedia>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._mediaRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(MediaBusiness);
export = MediaBusiness;
