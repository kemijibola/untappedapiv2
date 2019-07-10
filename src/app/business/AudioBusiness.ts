import AudioRepository from '../repository/AudioRepository';
import IAudioBusiness = require('./interfaces/AudioBusiness');
import { IAudio } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class AudioBusiness implements IAudioBusiness {
  private _audioRepository: AudioBusiness;

  constructor() {
    this._audioRepository = new AudioBusiness();
  }

  fetch(): Promise<IAudio> {
    return this._audioRepository.fetch();
  }

  findById(id: string): Promise<IAudio> {
    return this._audioRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IAudio> {
    return this.findByCriteria(criteria);
  }

  create(item: IAudio): Promise<IAudio> {
    return this._audioRepository.create(item);
  }

  async update(id: string, item: IAudio): Promise<IAudio> {
    const audioModel = await this._audioRepository.findById(id);
    if (!audioModel)
      throw new RecordNotFound(`Audio with id: ${id} not found`, 404);
    return this._audioRepository.update(audioModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._audioRepository.delete(id);
  }
}

Object.seal(AudioBusiness);
export = AudioBusiness;
