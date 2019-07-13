import AudioRepository from '../repository/AudioRepository';
import IAudioBusiness = require('./interfaces/AudioBusiness');
import { IAudio } from '../models/interfaces';
import { Result } from '../../utils/Result';

class AudioBusiness implements IAudioBusiness {
  private _audioRepository: AudioRepository;

  constructor() {
    this._audioRepository = new AudioRepository();
  }

  async fetch(): Promise<Result<IAudio>> {
    try {
      const audios = await this._audioRepository.fetch();
      return Result.ok<IAudio>(200, audios);
    } catch (err) {
      return Result.fail<IAudio>(500, `Internal server error occured. ${err}`);
    }
  }

  async findById(id: string): Promise<Result<IAudio>> {
    try {
      const audio = await this._audioRepository.findById(id);
      if (!audio)
        return Result.fail<IAudio>(404, `Audio of Id ${id} not found`);
      else return Result.ok<IAudio>(200, audio);
    } catch (err) {
      return Result.fail<IAudio>(500, `Internal server error occured. ${err}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IAudio>> {
    try {
      const audio = await this._audioRepository.findByCriteria(criteria);
      if (!audio) return Result.fail<IAudio>(404, `Audio not found`);
      else return Result.ok<IAudio>(200, audio);
    } catch (err) {
      return Result.fail<IAudio>(500, `Internal server error occured. ${err}`);
    }
  }

  async create(item: IAudio): Promise<Result<IAudio>> {
    try {
      const newAudio = await this._audioRepository.create(item);
      return Result.ok<IAudio>(201, newAudio);
    } catch (err) {
      return Result.fail<IAudio>(500, `Internal server error occured. ${err}`);
    }
  }

  async update(id: string, item: IAudio): Promise<Result<IAudio>> {
    try {
      const audio = await this._audioRepository.findById(id);
      if (!audio)
        return Result.fail<IAudio>(
          404,
          `Could not update audio.Audio of Id ${id} not found`
        );
      const updateObj = await this._audioRepository.update(audio._id, item);
      return Result.ok<IAudio>(200, updateObj);
    } catch (err) {
      return Result.fail<IAudio>(500, `Internal server error occured. ${err}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._audioRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(AudioBusiness);
export = AudioBusiness;
