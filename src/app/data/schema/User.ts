import MongodataAccess from '../MongodataAccess';
import { IUserModel } from '../../models/interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignInOptions } from '../../models/interfaces/custom/Global';
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;

class UserSchema {
  static get schema() {
    const userAccountStatusSchema: Schema = new Schema({
      status: { type: String },
      updatedAt: { type: Date }
    });
    const schema = new Schema(
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
        roles: {
          type: Schema.Types.ObjectId,
          ref: 'Role',
          required: true
        },
        lastLogin: { type: Date }
      },
      { timestamps: true }
    );
    return schema;
  }
}

UserSchema.schema.methods.comparePassword = async function(
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.schema.methods.generateToken = async function<IuserModel>(
  privateKey: string,
  signOptions: SignInOptions,
  payload: any
): Promise<string> {
  /*  extra data to be sent back to user is an object = { scopes: [], user_type: ''}
   **   and any extra  information the system might need
   */
  signOptions.subject = this._id;
  return await jwt.sign(payload, privateKey, signOptions);
};

// UserSchema.schema.pre<IUserModel>('save', function(next: any) {
//   console.log('pre-saving hook called');
//   const user = this;
//   console.log(user.name);
// });

const schema = mongooseConnection.model<IUserModel>('User', UserSchema.schema);
export = schema;
