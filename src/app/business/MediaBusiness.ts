import {
  IMediaItem,
  MediaPreview,
  TalentPortfolioPreview
} from "./../models/interfaces/Media";
import MediaRepository from "../repository/MediaRepository";
import IMediaBusiness = require("./interfaces/MediaBusiness");
import { ApprovalOperations, IApproval, IMedia } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { schedule } from "../../handlers/ScheduleTask";
import { StateMachineArns } from "../models/interfaces/custom/StateMachineArns";
import { threadId } from "worker_threads";

class MediaBusiness implements IMediaBusiness {
  private _mediaRepository: MediaRepository;

  constructor() {
    this._mediaRepository = new MediaRepository();
  }

  // TODO:: ensure soft delete on all media items: Audio, Image and Video
  async fetch(condition: any): Promise<Result<IMedia[]>> {
    const medias: IMedia[] = await this._mediaRepository.fetch(condition);
    if (medias) {
      medias.forEach(x => {
        return x.items.filter(y => !y.isDeleted);
      });
    }
    return Result.ok<IMedia[]>(200, medias);
  }

  async fetchTalentPortfolioPreview(
    condition: any
  ): Promise<Result<TalentPortfolioPreview[]>> {
    const portfolioPreviews = await this._mediaRepository.fetch(condition);
    let modified: TalentPortfolioPreview[] = [];
    if (portfolioPreviews) {
      modified = portfolioPreviews.reduce(
        (theMap: TalentPortfolioPreview[], theItem: IMedia) => {
          const items = [...theItem.items.filter(x => !x.isDeleted)];
          theMap.push({
            _id: theItem._id,
            mediaType: theItem.mediaType,
            talent: theItem.user,
            uploadType: theItem.uploadType,
            defaultImageKey: items.length > 0 ? items[0].path : "",
            mediaTitle: theItem.title,
            mediaDescription: theItem.shortDescription,
            items: items,
            itemsCount: items.length,
            dateCreated: theItem.createdAt
          });
          return theMap;
        },
        []
      );
    }
    console.log(modified);
    return Result.ok<TalentPortfolioPreview[]>(200, modified);
  }

  async fetchPreview(condition: any): Promise<Result<MediaPreview[]>> {
    const mediaPreviews = await this._mediaRepository.fetch(condition);
    let modified: MediaPreview[] = [];
    if (mediaPreviews) {
      modified = mediaPreviews.reduce(
        (theMap: MediaPreview[], theItem: IMedia) => {
          const items = [...theItem.items.filter(x => !x.isDeleted)];
          theMap.push({
            _id: theItem._id,
            title: theItem.title,
            mediaType: theItem.mediaType,
            uploadType: theItem.uploadType,
            defaultMediaPath: items.length > 0 ? items[0].path : "",
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
            createdAt: found.createdAt,
            isDeleted: found.isDeleted
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
    await this._mediaRepository.patch(id, {
      isDeleted: true
    });
    return Result.ok<boolean>(200, true);
  }

  async deleteMediaItem(id: string, itemId: string): Promise<Result<boolean>> {
    const media = await this._mediaRepository.findById(id);
    const newMediaItems = media.items.reduce(
      (theMap: IMediaItem[], theItem: IMediaItem) => {
        if (theItem._id == itemId) {
          theMap.push({
            _id: theItem._id,
            path: theItem.path,
            likedBy: theItem.likedBy,
            createdAt: theItem.createdAt,
            updatedAt: theItem.updatedAt,
            isDeleted: true
          });
        } else {
          theMap.push(theItem);
        }
        return theMap;
      },
      []
    );
    await this._mediaRepository.patch(id, { items: newMediaItems });
    return Result.ok<boolean>(200, true);
  }
}

Object.seal(MediaBusiness);
export = MediaBusiness;
