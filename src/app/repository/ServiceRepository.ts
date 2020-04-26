import { IService } from "../models/interfaces";
import { ServiceSchema } from "../data/schema/Service";
import RepositoryBase from "./base/RepositoryBase";

class ServiceRepository extends RepositoryBase<IService> {
  constructor() {
    super(ServiceSchema);
  }
}

Object.seal(ServiceRepository);
export = ServiceRepository;
