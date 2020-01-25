import { IRefreshToken } from "../models/interfaces";
import { RefreshTokenSchema } from "../data/schema/RefreshToken";
import RepositoryBase from "./base/RepositoryBase";

class RefreshTokenRepository extends RepositoryBase<IRefreshToken> {
  constructor() {
    super(RefreshTokenSchema);
  }
}

Object.seal(RefreshTokenRepository);
export = RefreshTokenRepository;
