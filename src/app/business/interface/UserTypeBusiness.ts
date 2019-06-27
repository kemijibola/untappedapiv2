import BaseBusiness = require('./base/BaseBusiness');
import { IUserType } from '../../models/interfaces';

interface UserTypeBusiness extends BaseBusiness<IUserType> {}
export = UserTypeBusiness;
