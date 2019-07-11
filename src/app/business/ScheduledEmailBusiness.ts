import ScheduledEmailRepository from '../repository/ScheduledEmailRepository';
import IScheduledEmailBusiness = require('./interfaces/ScheduledEmailBusiness');
import { IScheduledEmail } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ScheduleEmailBusiness implements IScheduledEmailBusiness {
  private _scheduledEmailRepository: ScheduledEmailRepository;

  constructor() {
    this._scheduledEmailRepository = new ScheduledEmailRepository();
  }

  async fetch(): Promise<Result<IScheduledEmail>> {
    try {
      const scheduledEmails = await this._scheduledEmailRepository.fetch();
      return Result.ok<IScheduledEmail>(200, scheduledEmails);
    } catch (err) {
      return Result.fail<IScheduledEmail>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IScheduledEmail>> {
    try {
      const scheduledEmail = await this._scheduledEmailRepository.findById(id);
      if (!scheduledEmail._id)
        return Result.fail<IScheduledEmail>(
          404,
          `Scheduled Email of Id ${id} not found`
        );
      else return Result.ok<IScheduledEmail>(200, scheduledEmail);
    } catch (err) {
      return Result.fail<IScheduledEmail>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IScheduledEmail>> {
    try {
      const scheduledEmail = await this._scheduledEmailRepository.findByCriteria(
        criteria
      );
      if (!scheduledEmail._id)
        return Result.fail<IScheduledEmail>(404, `Scheduled Email not found`);
      else return Result.ok<IScheduledEmail>(200, scheduledEmail);
    } catch (err) {
      return Result.fail<IScheduledEmail>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IScheduledEmail): Promise<Result<IScheduledEmail>> {
    try {
      const newScheduledEmail = await this._scheduledEmailRepository.create(
        item
      );
      return Result.ok<IScheduledEmail>(201, newScheduledEmail);
    } catch (err) {
      return Result.fail<IScheduledEmail>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(
    id: string,
    item: IScheduledEmail
  ): Promise<Result<IScheduledEmail>> {
    try {
      const scheduledEmail = await this._scheduledEmailRepository.findById(id);
      if (!scheduledEmail._id)
        return Result.fail<IScheduledEmail>(
          404,
          `Could not update scheduled email.Scheduled Email of Id ${id} not found`
        );
      const updateObj = await this._scheduledEmailRepository.update(
        scheduledEmail._id,
        item
      );
      return Result.ok<IScheduledEmail>(200, updateObj);
    } catch (err) {
      return Result.fail<IScheduledEmail>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._scheduledEmailRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(ScheduleEmailBusiness);
export = ScheduleEmailBusiness;
