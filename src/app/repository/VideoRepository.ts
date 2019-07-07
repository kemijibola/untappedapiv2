import { IMedia } from '../models/interfaces';
import { VideoSchema } from '../data/schema/Video';
import RepositoryBase from './base/RepositoryBase';

class VideoRepository extends RepositoryBase<IMedia> {
  constructor() {
    super(VideoSchema);
  }
}

Object.seal(VideoRepository);
export = VideoRepository;
