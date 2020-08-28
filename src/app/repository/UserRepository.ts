import mongoose = require("mongoose");
import { IUserModel, IRegister, IRegisterAdmin } from "../models/interfaces";
import { UserSchema } from "../data/schema/User";
import RepositoryBase from "./base/RepositoryBase";

class UserRepository extends RepositoryBase<IUserModel> {
  private userModel: mongoose.Model<mongoose.Document>;
  constructor() {
    super(UserSchema);
    this.userModel = UserSchema;
  }

  register(user: IRegister): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      this.userModel.create(user, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  registerAdmin(user: IRegisterAdmin): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      this.userModel.create(user, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  userTypeByUser(user: string): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      this.userModel
        .findById(user)
        .populate("userType", "name", (error: any, result: IUserModel) => {
          if (error) reject(error);
          else resolve(result);
        });
    });
  }
}

Object.seal(UserRepository);
export = UserRepository;
