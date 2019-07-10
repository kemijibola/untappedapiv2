import { IAudio } from '../models/interfaces';
import { AudioSchema } from '../data/schema/Audio';
import RepositoryBase from './base/RepositoryBase';

class AudioRepository extends RepositoryBase<IAudio> {
  constructor() {
    super(AudioSchema);
  }
}

Object.seal(AudioRepository);
export = AudioRepository;
