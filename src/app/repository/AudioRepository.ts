import { IMedia } from '../models/interfaces';
import { AudioSchema } from '../data/schema/Audio';
import RepositoryBase from './base/RepositoryBase';

class AudioRepository extends RepositoryBase<IMedia> {
  constructor() {
    super(AudioSchema);
  }
}

Object.seal(AudioRepository);
export = AudioRepository;
