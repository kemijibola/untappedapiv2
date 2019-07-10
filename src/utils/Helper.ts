import { IUserModel } from '../app/models/interfaces';
import UserRepository = require('../app/repository/UserRepository');
import CategoryRepository = require('../app/repository/CategoryRepository');

export default {
  async findUserById(_id: string): Promise<IUserModel> {
    return await new UserRepository().findById(_id);
  },
  async isValidCategories(categories: string[]): Promise<boolean> {
    let found = true;
    for (let category of categories) {
      const categoryModel = await new CategoryRepository().findById(category);
      if (categoryModel.name) {
        return (found = false);
      }
    }
    return found;
  }
};
