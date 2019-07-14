import { IApplication } from '../models/interfaces';
import { ApplicationSchema } from '../data/schema/Application';
import RepositoryBase from './base/RepositoryBase';

class ApplicationRepository extends RepositoryBase<IApplication> {
  constructor() {
    super(ApplicationSchema);
  }
}

Object.seal(ApplicationRepository);
export = ApplicationRepository;
