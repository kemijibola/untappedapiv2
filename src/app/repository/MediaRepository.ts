import { IMedia } from "../models/interfaces";
import { MediaSchema } from "../data/schema/Media";
import RepositoryBase from "./base/RepositoryBase";

class MediaRepository extends RepositoryBase<IMedia> {
  constructor() {
    super(MediaSchema);
  }
}

Object.seal(MediaRepository);
export = MediaRepository;
