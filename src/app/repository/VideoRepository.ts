import { IVideo } from '../models/interfaces';
import { VideoSchema } from '../data/schema/Video';
import RepositoryBase from './base/RepositoryBase';

class VideoRepository extends RepositoryBase<IVideo> {
  constructor() {
    super(VideoSchema);
  }
}

Object.seal(VideoRepository);
export = VideoRepository;
