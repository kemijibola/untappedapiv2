import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Gig } from '../interfaces/models';

const gigSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String },
    items: [{ type: String }],
    deletedBySender: { type: Boolean, default: false },
    deletedByReciver: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Gig = mongoose.model<Gig>('Gig', gigSchema);
export default Gig;
