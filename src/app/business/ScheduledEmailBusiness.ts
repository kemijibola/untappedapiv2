import ScheduledEmailRepository from '../repository/ScheduledEmailRepository';
import IScheduledEmailBusiness = require('./interfaces/ScheduledEmailBusiness');
import { IScheduledComment, IScheduledEmail } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ScheduleEmailBusiness implements IScheduledEmailBusiness {
  private _scheduledEmailRepository: ScheduledEmailRepository;

  constructor() {
    this._scheduledEmailRepository = new ScheduledEmailRepository();
  }

  fetch(): Promise<IScheduledEmail> {
    return this._scheduledEmailRepository.fetch();
  }

  findById(id: string): Promise<IScheduledEmail> {
    return this._scheduledEmailRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IScheduledEmail> {
    return this.findByCriteria(criteria);
  }

  create(item: IScheduledEmail): Promise<IScheduledEmail> {
    return this._scheduledEmailRepository.create(item);
  }

  async update(id: string, item: IScheduledEmail): Promise<IScheduledEmail> {
    const roleModel = await this._scheduledEmailRepository.findById(id);
    if (!roleModel)
      throw new RecordNotFound(`Scheduled Email with id: ${id} not found`, 404);
    return this._scheduledEmailRepository.update(roleModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._scheduledEmailRepository.delete(id);
  }
}

Object.seal(ScheduleEmailBusiness);
export = ScheduleEmailBusiness;
