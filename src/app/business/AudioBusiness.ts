import AudioRepository from "../repository/AudioRepository";
import IAudioBusiness = require("./interfaces/AudioBusiness");
import { IAudio, IApproval, ApprovalOperations } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { schedule } from "../../handlers/ScheduleTask";
import { StateMachineArns } from "../models/interfaces/custom/StateMachineArns";

class AudioBusiness implements IAudioBusiness {
  private _audioRepository: AudioRepository;

  constructor() {
    this._audioRepository = new AudioRepository();
  }

  async fetch(condition: any): Promise<Result<IAudio[]>> {
    try {
      condition.isApproved = true;
      condition.isDeleted = false;
      const audios = await this._audioRepository.fetch(condition);
      return Result.ok<IAudio[]>(200, audios);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IAudio>> {
    try {
      if (!id) return Result.fail<IAudio>(400, "Bad request.");
      const criteria = {
        id,
        isApproved: true,
        isDeleted: false
      };
      const audio = await this._audioRepository.findByIdCriteria(criteria);
      if (!audio)
        return Result.fail<IAudio>(404, `Audio of Id ${id} not found`);
      else return Result.ok<IAudio>(200, audio);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IAudio>> {
    try {
      if (!condition) return Result.fail<IAudio>(400, "Bad request.");
      condition.isApproved = true;
      condition.isDeleted = false;
      const audio = await this._audioRepository.findById(condition);
      if (!audio) return Result.fail<IAudio>(404, `Audio not found`);
      else return Result.ok<IAudio>(200, audio);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IAudio>> {
    try {
      if (!criteria) return Result.fail<IAudio>(400, "Bad request");
      criteria.isApproved = true;
      criteria.isDeleted = false;
      const audio = await this._audioRepository.findByCriteria(criteria);
      if (!audio) return Result.fail<IAudio>(404, `Audio not found`);
      else return Result.ok<IAudio>(200, audio);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IAudio): Promise<Result<any>> {
    try {
      item.viewCount = 0;
      item.isApproved = false;
      item.isDeleted = false;
      const newAudio = await this._audioRepository.create(item);
      // create approval request

      const approvalRequest: IApproval = Object.assign({
        entity: newAudio._id,
        operation: ApprovalOperations.AudioUpload,
        application: "untappedpool.com"
      });
      await schedule(
        StateMachineArns.MediaStateMachine,
        newAudio.createdAt,
        approvalRequest
      );

      return Result.ok<boolean>(201, true);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IAudio): Promise<Result<IAudio>> {
    try {
      const audio = await this._audioRepository.findById(id);
      if (!audio)
        return Result.fail<IAudio>(
          404,
          `Could not update audio.Audio with Id ${id} not found`
        );
      item.isApproved = audio.isApproved;
      item.isDeleted = audio.isDeleted;
      const updateObj = await this._audioRepository.update(audio._id, item);
      return Result.ok<IAudio>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._audioRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(AudioBusiness);
export = AudioBusiness;
