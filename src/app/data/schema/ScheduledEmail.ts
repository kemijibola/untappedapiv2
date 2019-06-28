import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IScheduledEmail } from '../../models/interfaces';

class ScheduledEmailSchema {
  static get schema() {
    const schema = new Schema(
      {
        mailType: { type: String, required: true },
        subject: { type: String },
        body: { type: String, required: true },
        receiverEmail: [{ type: String, required: true }],
        ccCopyEmail: [{ type: String }],
        scheduleDate: { type: Date },
        readyToSend: { type: Boolean, required: true, default: false },
        isPickedForSending: { type: Boolean, required: true, default: false },
        isSent: { type: Boolean, required: true, default: false },
        sentDate: { type: Date },
        errorMessage: { type: String }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IScheduledEmail>(
  'ScheduledEmail',
  ScheduledEmailSchema.schema
);
export = schema;
