import ProfileRepository from "../repository/ProfileRepository";
import IProfileBusiness = require("./interfaces/ProfileBusiness");
import { IProfile } from "../models/interfaces";
import { Result } from "../../utils/Result";

class ProfileBusiness implements IProfileBusiness {
  private _profileRepository: ProfileRepository;

  constructor() {
    this._profileRepository = new ProfileRepository();
  }

  async fetch(condition: any): Promise<Result<IProfile[]>> {
    try {
      const profiles = await this._profileRepository.fetch(condition);
      return Result.ok<IProfile[]>(200, profiles);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IProfile>> {
    try {
      if (!id) return Result.fail<IProfile>(400, "Bad request");
      const profile = await this._profileRepository.findById(id);
      if (!profile)
        return Result.fail<IProfile>(404, `Profile of Id ${id} not found`);
      else return Result.ok<IProfile>(200, profile);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IProfile>> {
    try {
      if (!condition) return Result.fail<IProfile>(400, "Bad request");
      const profile = await this._profileRepository.findByOne(condition);
      if (!profile) return Result.fail<IProfile>(404, `Talent not found`);
      else return Result.ok<IProfile>(200, profile);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByUser(id: string): Promise<Result<IProfile>> {
    try {
      const profile = await this._profileRepository.findByCriteria({
        user: id
      });
      return Result.ok<IProfile>(200, profile);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IProfile>> {
    try {
      const profile = await this._profileRepository.findByCriteria(criteria);
      if (!profile) return Result.fail<IProfile>(404, "Profile not found");
      else return Result.ok<IProfile>(200, profile);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IProfile): Promise<Result<IProfile>> {
    try {
      const newProfile = await this._profileRepository.create(item);
      return Result.ok<IProfile>(201, newProfile);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IProfile): Promise<Result<IProfile>> {
    try {
      const profile = await this._profileRepository.findById(id);
      if (!profile)
        return Result.fail<IProfile>(
          404,
          `Could not update profile.Profile with Id ${id} not found`
        );
      const updateObj = await this._profileRepository.update(profile._id, item);
      return Result.ok<IProfile>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._profileRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ProfileBusiness);
export = ProfileBusiness;
