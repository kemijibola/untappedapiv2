import BaseBusiness = require('./base/BaseBusiness');
import { IResourcePermission } from '../../models/interfaces';

interface ResourcePermissionBusiness
  extends BaseBusiness<IResourcePermission> {}
export = ResourcePermissionBusiness;
