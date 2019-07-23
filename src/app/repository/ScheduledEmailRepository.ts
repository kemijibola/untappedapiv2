import { IScheduledEmail } from '../models/interfaces';
import { ScheduledEmailSchema } from '../data/schema/ScheduledEmail';
import RepositoryBase from './base/RepositoryBase';
import mongoose = require('mongoose');
import { SignUpEmailViewModel } from '../models/viewmodels';

class ScheduledEmailRepository extends RepositoryBase<IScheduledEmail> {
  private _scheduledEmail: mongoose.Model<mongoose.Document>;

  constructor() {
    super(ScheduledEmailSchema);
    this._scheduledEmail = ScheduledEmailSchema;
  }

  createSignUpEmail(item: SignUpEmailViewModel): Promise<IScheduledEmail> {
    return new Promise((resolve, reject) => {
      this._scheduledEmail.create(item, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
}

Object.seal(ScheduledEmailRepository);
export = ScheduledEmailRepository;
