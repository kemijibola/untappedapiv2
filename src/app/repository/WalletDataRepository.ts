import { WalletDataSchema } from "../data/schema/WalletData";
import RepositoryBase from "./base/RepositoryBase";
import { WalletData } from "../models/interfaces";

class WalletDatRepository extends RepositoryBase<WalletData> {
  constructor() {
    super(WalletDataSchema);
  }
}

Object.seal(WalletDatRepository);
export = WalletDatRepository;
