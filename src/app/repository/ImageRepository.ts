import { IVideo } from '../models/interfaces';
import { ImageSchema } from '../data/schema/Image';
import RepositoryBase from './base/RepositoryBase';

class ImageRepository extends RepositoryBase<IVideo> {
  constructor() {
    super(ImageSchema);
  }
}

Object.seal(ImageRepository);
export = ImageRepository;
