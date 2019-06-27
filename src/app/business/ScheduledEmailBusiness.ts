import ScheduledEmailRepository from '../repository/ScheduledEmailRepository';
import IScheduledEmailBusiness from './interface/ScheduledEmailBusiness';
import { IScheduledEmail } from '../models/interfaces';

class RoleBusiness implements IScheduledEmailBusiness {
  private _scheduledEmailRepository: ScheduledEmailRepository;

  constructor() {
    this._scheduledEmailRepository = new ScheduledEmailRepository();
  }

  create(item: IScheduledEmail, callback: (error: any, result: any) => void) {
    this._scheduledEmailRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._scheduledEmailRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IScheduledEmail,
    callback: (error: any, result: any) => void
  ) {
    this._scheduledEmailRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._scheduledEmailRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._scheduledEmailRepository.delete(_id, callback);
  }

  findById(
    _id: string,
    callback: (error: any, result: IScheduledEmail) => void
  ) {
    this._scheduledEmailRepository.findById(_id, callback);
  }
}
Object.seal(RoleBusiness);
export = RoleBusiness;
