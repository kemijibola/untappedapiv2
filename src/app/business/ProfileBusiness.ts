import ProfileRepository from "../repository/ProfileRepository";
import UserRepository from "../repository/UserRepository";
import MediaRepository from "../repository/MediaRepository";
import IProfileBusiness = require("./interfaces/ProfileBusiness");
import {
  IProfile,
  IUserModel,
  TalentProfile,
  IMedia,
} from "../models/interfaces";
import { Result } from "../../utils/Result";

class ProfileBusiness implements IProfileBusiness {
  private _profileRepository: ProfileRepository;
  private _userRepository: UserRepository;
  private _mediaRepository: MediaRepository;

  constructor() {
    this._profileRepository = new ProfileRepository();
    this._userRepository = new UserRepository();
    this._mediaRepository = new MediaRepository();
  }

  async fetch(condition: any): Promise<Result<IProfile[]>> {
    const profiles = await this._profileRepository.fetch(condition);
    return Result.ok<IProfile[]>(200, profiles);
  }

  async findById(id: string): Promise<Result<IProfile>> {
    if (!id) return Result.fail<IProfile>(400, "Bad request");
    const profile = await this._profileRepository.findById(id);
    if (!profile)
      return Result.fail<IProfile>(404, `Profile of Id ${id} not found`);
    else return Result.ok<IProfile>(200, profile);
  }

  async fetchPendingTalentProfile(
    condition: any
  ): Promise<Result<TalentProfile[]>> {
    let talentProfiles: TalentProfile[] = [];
    const talentsPendingApproval: IUserModel[] = await this._userRepository.fetch(
      condition
    );

    for (let talent of talentsPendingApproval) {
      const profile = await this._profileRepository.findByCriteria({
        user: talent._id,
      });

      if (profile) {
        const modified: TalentProfile = {
          talentId: talent._id,
          talentName: talent.fullName,
          profilePicture: talent.profileImagePath || "",
          emailConfirmed: talent.isEmailConfirmed,
          portfolioApproved: false,
          dateJoined: talent.createdAt,
          shortBio: profile.shortBio || "",
          phoneNumber: profile.phoneNumbers ? profile.phoneNumbers[0] : "",
        };

        const talentMedias: IMedia[] = await this._mediaRepository.fetch({
          user: profile.user,
        });
        if (talentMedias.length > 0) {
          for (let media of talentMedias) {
            modified.portfolioApproved =
              media.items.filter((x) => x.approvedBy).length > 0;
            if (modified.portfolioApproved) break;
          }
        }

        talentProfiles = [...talentProfiles, modified];
      }
    }
    return Result.ok<TalentProfile[]>(200, talentProfiles);
  }
  async findOne(condition: any): Promise<Result<IProfile>> {
    if (!condition) return Result.fail<IProfile>(400, "Bad request");
    const profile = await this._profileRepository.findByOne(condition);
    if (!profile) return Result.fail<IProfile>(404, `Talent not found`);
    else return Result.ok<IProfile>(200, profile);
  }

  async findByUser(id: string): Promise<Result<IProfile>> {
    const profile = await this._profileRepository.findByCriteria({
      user: id,
    });
    return Result.ok<IProfile>(200, profile);
  }

  async findByCriteria(criteria: any): Promise<Result<IProfile>> {
    const profile = await this._profileRepository.findByCriteria(criteria);
    if (!profile) return Result.fail<IProfile>(404, "Profile not found");
    return Result.ok<IProfile>(200, profile);
  }

  async create(item: IProfile): Promise<Result<IProfile>> {
    item.tapCount = 0;
    const newProfile = await this._profileRepository.create(item);
    return Result.ok<IProfile>(201, newProfile);
  }

  async patch(id: string, item: any): Promise<Result<IProfile>> {
    const profile = await this._profileRepository.findById(id);
    if (!profile)
      return Result.fail<IProfile>(
        404,
        `Could not update profile.Profile with Id ${id} not found`
      );
    item.tapCount = profile.tapCount;
    item.updateAt = Date.now();
    item.user = profile.user;
    const updateObj = await this._profileRepository.patch(profile._id, item);
    return Result.ok<IProfile>(200, updateObj);
  }

  async updateLike(id: string, item: IProfile): Promise<Result<IProfile>> {
    const profile = await this._profileRepository.findById(id);
    if (!profile)
      return Result.fail<IProfile>(
        404,
        `Could not update profile.Profile with Id ${id} not found`
      );
    const updateObj = await this._profileRepository.update(profile._id, item);
    return Result.ok<IProfile>(200, updateObj);
  }

  async update(id: string, item: IProfile): Promise<Result<IProfile>> {
    const profile = await this._profileRepository.findById(id);
    if (!profile)
      return Result.fail<IProfile>(
        404,
        `Could not update profile.Profile with Id ${id} not found`
      );
    item.tappedBy = profile.tappedBy;
    item.user = profile.user;
    const updateObj = await this._profileRepository.update(profile._id, item);
    return Result.ok<IProfile>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._profileRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(ProfileBusiness);
export = ProfileBusiness;
