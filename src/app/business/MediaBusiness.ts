import {
  IMediaItem,
  MediaPreview,
  TalentPortfolioPreview,
  MediaType,
} from "./../models/interfaces/Media";
import MediaRepository from "../repository/MediaRepository";
import IMediaBusiness = require("./interfaces/MediaBusiness");
import { IMedia } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { stringList } from "aws-sdk/clients/datapipeline";

class MediaBusiness implements IMediaBusiness {
  private _mediaRepository: MediaRepository;

  constructor() {
    this._mediaRepository = new MediaRepository();
  }

  // TODO:: ensure soft delete on all media items: Audio, Image and Video
  async fetch(condition: any): Promise<Result<IMedia[]>> {
    const medias: IMedia[] = await this._mediaRepository.fetch(condition);
    if (medias) {
      medias.forEach((x) => {
        const mediaItems = x.items.filter((y) => !y.isDeleted && y.isApproved);
        if (mediaItems.length > 0) return x;
      });
    }
    return Result.ok<IMedia[]>(200, medias);
  }

  async fetchMediaPendingApproval(condition: any): Promise<Result<IMedia[]>> {
    let mediaPendingApproval: IMedia[] = [];
    const medias: IMedia[] = await this._mediaRepository.fetch(condition);
    if (medias) {
      for (let media of medias) {
        media.items = media.items.filter((x) => !x.isDeleted && !x.isApproved);
        if (media.items.length > 0) {
          mediaPendingApproval = [...mediaPendingApproval, media];
        }
      }
    }
    return Result.ok<IMedia[]>(200, mediaPendingApproval);
  }

  async fetchTalentPortfolioPreview(
    condition: any
  ): Promise<Result<TalentPortfolioPreview[]>> {
    const portfolioPreviews = await this._mediaRepository.fetchWithUser(
      condition
    );
    let modified: TalentPortfolioPreview[] = [];
    if (portfolioPreviews) {
      modified = portfolioPreviews.reduce(
        (theMap: TalentPortfolioPreview[], theItem: IMedia) => {
          const items = [
            ...theItem.items.filter((x) => !x.isDeleted && x.isApproved),
          ];
          if (items.length > 0) {
            theMap.push({
              _id: theItem._id,
              mediaType: theItem.mediaType,
              talent: theItem.user,
              aliasName: theItem.user.fullName,
              uploadType: theItem.uploadType,
              albumCoverKey: theItem.albumCover || "",
              defaultImageKey: items.length > 0 ? items[0].path : "",
              mediaTitle: theItem.title,
              mediaDescription: theItem.shortDescription,
              items: items,
              itemsCount: items.length,
              dateCreated: theItem.createdAt,
            });
          }
          return theMap;
        },
        []
      );
    }
    return Result.ok<TalentPortfolioPreview[]>(200, modified);
  }

  async fetchPreview(condition: any): Promise<Result<MediaPreview[]>> {
    const mediaPreviews = await this._mediaRepository.fetch(condition);
    let modified: MediaPreview[] = [];
    if (mediaPreviews) {
      modified = mediaPreviews.reduce(
        (theMap: MediaPreview[], theItem: IMedia) => {
          const items = [
            ...theItem.items.filter((x) => !x.isDeleted && x.isApproved),
          ];
          let albumCover = "";
          if (items.length > 0) {
            if (theItem.mediaType === MediaType.video) {
              albumCover = theItem.albumCover || "";
            }
            if (theItem.mediaType === MediaType.image) {
              albumCover = theItem.items[0].path;
            }
            theMap.push({
              _id: theItem._id,
              title: theItem.title,
              mediaType: theItem.mediaType,
              uploadType: theItem.uploadType,
              defaultMediaPath: albumCover || "",
              shortDescription: theItem.shortDescription,
              itemCount: items.length,
            });
          }
          return theMap;
        },
        []
      );
    }

    return Result.ok<MediaPreview[]>(200, modified);
  }

  async findMedia(criteria: any): Promise<Result<IMedia>> {
    const media = await this._mediaRepository.findByIdCriteria(criteria);
    if (!media) return Result.fail<IMedia>(404, "Media not found");

    media.items = media.items.filter((x) => !x.isDeleted && x.isApproved);
    return Result.ok<IMedia>(200, media);
  }

  async findById(id: string): Promise<Result<IMedia>> {
    const criteria = {
      _id: id,
      isApproved: true,
      isDeleted: false,
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
    item.isDeleted = false;
    const newMedia = await this._mediaRepository.create(item);
    return Result.ok<IMedia>(201, newMedia);
  }

  async rejectMedia(
    mediaId: string,
    mediaItemId: string,
    rejectedBy: string,
    rejectionReason: string
  ): Promise<Result<boolean>> {
    const media = await this._mediaRepository.findById(mediaId);
    if (!media) return Result.fail<boolean>(404, "Media not found.");
    const modifiedItems = media.items.reduce(
      (theMap: IMediaItem[], theItem: IMediaItem) => {
        if (theItem._id == mediaItemId) {
          theMap.push(
            Object.assign({
              _id: theItem._id,
              path: theItem.path,
              likedBy: theItem.likedBy,
              createdAt: theItem.createdAt,
              updatedAt: theItem.updatedAt,
              isApproved: theItem.isApproved,
              approvedBy: rejectedBy,
              approvedDate: new Date(),
              rejectionReason: rejectionReason,
            })
          );
        } else {
          theMap = [...theMap, theItem];
        }
        return theMap;
      },
      []
    );
    await this._mediaRepository.patch(media._id, {
      items: modifiedItems,
    });
    return Result.ok<boolean>(200, true);
  }

  async approveMedia(
    mediaId: string,
    mediaItemId: string,
    approvedBy: string
  ): Promise<Result<boolean>> {
    const media = await this._mediaRepository.findById(mediaId);
    if (!media) return Result.fail<boolean>(404, "Media not found.");

    const modifiedItems = media.items.reduce(
      (theMap: IMediaItem[], theItem: IMediaItem) => {
        if (theItem._id == mediaItemId) {
          theMap.push(
            Object.assign({
              _id: theItem._id,
              path: theItem.path,
              likedBy: theItem.likedBy,
              createdAt: theItem.createdAt,
              updatedAt: theItem.updatedAt,
              isApproved: true,
              approvedBy: approvedBy,
              approvedDate: new Date(),
            })
          );
        } else {
          theMap = [...theMap, theItem];
        }
        return theMap;
      },
      []
    );

    await this._mediaRepository.patch(media._id, {
      items: modifiedItems,
    });
    return Result.ok<boolean>(200, true);
  }

  async update(id: string, item: IMedia): Promise<Result<IMedia>> {
    const media = await this._mediaRepository.findById(id);
    if (!media) return Result.fail<IMedia>(404, "Media not found.");

    if (media.user != item.user)
      return Result.fail<IMedia>(
        403,
        "You are not authorized to perform this update."
      );

    media._id = media._id;
    media.title = item.title || media.title;
    media.shortDescription = item.shortDescription || media.shortDescription;
    media.user = media.user;
    media.isDeleted = media.isDeleted;
    media.createdAt = media.createdAt;
    media.items = [...media.items];

    const updateObj = await this._mediaRepository.update(media._id, media);
    return Result.ok<IMedia>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    await this._mediaRepository.patch(id, {
      isDeleted: true,
    });
    return Result.ok<boolean>(200, true);
  }

  async updateExistingMedia(id: string, item: IMedia): Promise<Result<IMedia>> {
    const media = await this._mediaRepository.findById(id);
    if (!media) return Result.fail<IMedia>(404, "Media not found");
    if (media.user != item.user)
      return Result.fail<IMedia>(
        403,
        "You are not authorized to perform this update."
      );
    media._id = media._id;
    media.title = item.title || media.title;
    media.shortDescription = item.shortDescription || media.shortDescription;
    media.user = media.user;
    const newItems = item.items.reduce((theMap: IMediaItem[], theItem: any) => {
      const item: IMediaItem = {
        path: theItem.path,
        isApproved: false,
        isDeleted: false,
      };
      theMap = [...theMap, item];
      return theMap;
    }, []);
    media.items = [...media.items, ...newItems];
    media.uploadType = media.uploadType;
    media.mediaType = media.mediaType;
    media.isDeleted = media.isDeleted;
    media.activityCount = media.activityCount;

    let updatedObj = await this._mediaRepository.patch(media._id, media);
    updatedObj.items = updatedObj.items.filter(
      (x) => !x.isDeleted && x.isApproved
    );
    return Result.ok<IMedia>(200, updatedObj);
  }

  async deleteMediaItem(id: string, itemId: string): Promise<Result<boolean>> {
    const media = await this._mediaRepository.findById(id);
    media.items = media.items.reduce(
      (theMap: IMediaItem[], theItem: IMediaItem) => {
        if (theItem._id == itemId) {
          theMap.push({
            _id: theItem._id,
            path: theItem.path,
            likedBy: theItem.likedBy,
            createdAt: theItem.createdAt,
            updatedAt: theItem.updatedAt,
            isDeleted: true,
            isApproved: theItem.isApproved,
          });
        } else {
          theMap.push(theItem);
        }
        return theMap;
      },
      []
    );

    const remainingMediaItems = media.items.filter(
      (x) => !x.isDeleted && x.isApproved
    );
    if (remainingMediaItems.length < 1) {
      media.isDeleted = true;
      await this._mediaRepository.patch(media._id, { items: media.items });
      await this._mediaRepository.update(media._id, media);
    } else {
      await this._mediaRepository.patch(media._id, { items: media.items });
    }

    return Result.ok<boolean>(200, true);
  }
}

Object.seal(MediaBusiness);
export = MediaBusiness;
