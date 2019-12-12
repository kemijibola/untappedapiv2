import { IProfile } from "../models/interfaces";
import { ProfileSchema } from "../data/schema/Profile";
import RepositoryBase from "./base/RepositoryBase";

class ProfileRepository extends RepositoryBase<IProfile> {
  constructor() {
    super(ProfileSchema);
  }
}

Object.seal(ProfileRepository);
export = ProfileRepository;
