import BaseBusiness from './base/BaseBusiness';
import { IUserModel } from '../../models/interfaces';

interface UserBusiness extends BaseBusiness<IUserModel> {}
export = UserBusiness;
