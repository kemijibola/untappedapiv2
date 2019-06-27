import BaseBusiness = require('./base/BaseBusiness');
import { IRole } from '../../models/interfaces';

interface RoleBusiness extends BaseBusiness<IRole> {}
export = RoleBusiness;
