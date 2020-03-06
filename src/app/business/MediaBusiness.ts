import { IMediaItem, MediaPreview } from "./../models/interfaces/Media";
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
    const medias = await this._mediaRepository.fetch(condition);
    return Result.ok<IMedia[]>(200, medias);
  }

  async fetchPreview(condition: any): Promise<Result<MediaPreview[]>> {
    const mediaPreviews = await this._mediaRepository.fetch(condition);
    let modified: MediaPreview[] = [];
    if (mediaPreviews) {
      modified = mediaPreviews.reduce(
        (theMap: MediaPreview[], theItem: IMedia) => {
          theMap.push({
            _id: theItem._id,
            title: theItem.title,
            mediaType: theItem.mediaType,
            uploadType: theItem.uploadType,
            defaultMediaPath: theItem.items[0].path,
            shortDescription: theItem.shortDescription,
            activityCount: theItem.activityCount
          });
          return theMap;
        },
        []
      );
    }
    return Result.ok<MediaPreview[]>(200, modified);
  }

  async findById(id: string): Promise<Result<IMedia>> {
    const criteria = {
      _id: id,
      isApproved: true,
      isDeleted: false
    };
    const media = await this._mediaRepository.findByIdCriteria(criteria);
    if (!media) return Result.fail<IMedia>(404, "Media not found");
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
    criteria.isApproved = true;
    criteria.isDeleted = false;
    const media = await this._mediaRepository.findByCriteria(criteria);
    if (!media) return Result.fail<IMedia>(404, `Media not found`);
    return Result.ok<IMedia>(200, media);
  }

  async create(item: IMedia): Promise<Result<IMedia>> {
    item.activityCount = 0;
    item.isApproved = false;
    item.isDeleted = false;
    const newMedia = await this._mediaRepository.create(item);
    return Result.ok<IMedia>(201, newMedia);
  }

  async update(id: string, item: IMedia): Promise<Result<IMedia>> {
    const media = await this._mediaRepository.findById(id);
    if (!media) return Result.fail<IMedia>(404, "Media not found.");
    item.isApproved = media.isApproved;
    item.isDeleted = media.isDeleted;
    item.createdAt = media.createdAt;
    item.updateAt = new Date();
    const mediaItems = item.items ? [...item.items] : [];
    item.items = [];

    if (mediaItems) {
      for (let mediaItem of mediaItems) {
        if (mediaItem._id) {
          var found = media.items.filter(x => (x._id = mediaItem._id))[0];
          if (!found) {
            return Result.fail<IMedia>(
              404,
              `Media item ${mediaItem._id} not found`
            );
          }
          const imageItem: IMediaItem = {
            _id: found._id,
            likedBy: mediaItem.likedBy,
            path: found.path,
            createdAt: found.createdAt
          };
          item.items = [...item.items, imageItem];
        } else {
          var newMediaItem: IMediaItem = {
            path: mediaItem.path
          };
          item.items = [...item.items, newMediaItem];
        }
      }
    }
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
