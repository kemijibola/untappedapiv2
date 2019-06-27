import BaseBusiness = require('./base/BaseBusiness');
import { IUser } from '../../models/interfaces';

interface UserBusiness extends BaseBusiness<IUser> {}
export = UserBusiness;
