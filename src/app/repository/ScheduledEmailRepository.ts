import { IScheduledEmail } from '../models/interfaces';
import { ScheduledEmailSchema } from '../data/schema/ScheduledEmail';
import RepositoryBase from './base/RepositoryBase';

class ScheduledEmailRepository extends RepositoryBase<IScheduledEmail> {
  constructor() {
    super(ScheduledEmailSchema);
  }
}

Object.seal(ScheduledEmailRepository);
export = ScheduledEmailRepository;
