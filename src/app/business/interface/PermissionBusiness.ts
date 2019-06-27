import BaseBusiness = require('./base/BaseBusiness');
import { IPermission } from '../../models/interfaces';

interface PermissionBusiness extends BaseBusiness<IPermission> {}
export = PermissionBusiness;
