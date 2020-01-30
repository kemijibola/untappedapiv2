import ProfileRepository from "../repository/ProfileRepository";
import UserRepository from "../repository/UserRepository";
import IProfileBusiness = require("./interfaces/ProfileBusiness");
import { IProfile } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { Talent } from "../models/interfaces/custom/UserViewModel";

class ProfileBusiness implements IProfileBusiness {
  private _profileRepository: ProfileRepository;
  private _userRepository: UserRepository;

  constructor() {
    this._profileRepository = new ProfileRepository();
    this._userRepository = new UserRepository();
  }

  async fetch(condition: any): Promise<Result<IProfile[]>> {
    const profiles = await this._profileRepository.fetch(condition);
    return Result.ok<IProfile[]>(200, profiles);
  }

  // async fetchTalents(): Promise<Result<Talent[]>> {
  // user user-type to fetch Id
  // use id to fetch all the userType fetch({ isProfileCompleted: true, status: STATUS.ACTIVATED})

  // Get profile of each fetched user into IFactory

  // return userTypeProfile

  // var talentUsers = await this._userRepository.findByOne({});
  // return true;
  // }

  async findById(id: string): Promise<Result<IProfile>> {
    if (!id) return Result.fail<IProfile>(400, "Bad request");
    const profile = await this._profileRepository.findById(id);
    if (!profile)
      return Result.fail<IProfile>(404, `Profile of Id ${id} not found`);
    else return Result.ok<IProfile>(200, profile);
  }

  async findOne(condition: any): Promise<Result<IProfile>> {
    if (!condition) return Result.fail<IProfile>(400, "Bad request");
    const profile = await this._profileRepository.findByOne(condition);
    if (!profile) return Result.fail<IProfile>(404, `Talent not found`);
    else return Result.ok<IProfile>(200, profile);
  }

  async findByUser(id: string): Promise<Result<IProfile>> {
    const profile = await this._profileRepository.findByCriteria({
      user: id
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
    const updateObj = await this._profileRepository.patch(profile._id, item);
    return Result.ok<IProfile>(200, updateObj);
  }

  async update(id: string, item: IProfile): Promise<Result<IProfile>> {
    const profile = await this._profileRepository.findById(id);
    if (!profile)
      return Result.fail<IProfile>(
        404,
        `Could not update profile.Profile with Id ${id} not found`
      );
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
