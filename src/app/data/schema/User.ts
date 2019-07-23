import MongodataAccess from '../MongodataAccess';
import { Schema } from 'mongoose';
import { IUserModel, AccountStatus } from '../../models/interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignInOptions } from '../../models/interfaces/custom/Global';
const mongooseConnection = MongodataAccess.mongooseConnection;

const userAccountStatusSchema: Schema = new Schema({
  status: { type: AccountStatus },
  updatedAt: { type: Date }
});

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isEmailConfirmed: { type: Boolean, default: false },
    isPhoneConfirmed: { type: Boolean, default: false },
    isProfileCompleted: { type: Boolean, default: false },
    generalNotification: { type: Boolean, default: true },
    tapNotification: { type: Boolean, default: true },
    emailNotification: { type: Boolean, default: true },
    profileVisibility: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0 },
    status: [userAccountStatusSchema],
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
      }
    ],
    profileImage: { type: String },
    lastLogin: { type: Date }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = async function(
  privateKey: string,
  signOptions: SignInOptions,
  payload: any
): Promise<string> {
  /*  extra data to be sent back to user is an object = { scopes: [], user_type: ''}
   **   and any extra information the system might need
   */
  signOptions.subject = this._id.toString();
  return await jwt.sign(payload, privateKey, signOptions);
};

userSchema.pre<IUserModel>('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.pre<IUserModel>('save', function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const UserSchema = mongooseConnection.model<IUserModel>(
  'User',
  userSchema
);
