import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { User } from '../interfaces/models';

const userAccountStatusSchema = new Schema({
  status: { type: String },
  updatedAt: { type: Date }
});

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isEmailConfirmed: { type: Boolean, default: false },
    isPhoneConfirmed: { type: Boolean, default: false },
    isProfileCompleted: { type: Boolean, default: false },
    generalNotification: { type: Boolean, default: true },
    emailNotification: { type: Boolean, default: true },
    profileVisibility: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0 },
    status: userAccountStatusSchema,
    roles: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    lastLogin: { type: Date }
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', userSchema);
export default User;
