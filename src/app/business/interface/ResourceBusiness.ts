import BaseBusiness = require('./base/BaseBusiness');
import { IResource } from '../../models/interfaces';

interface ResourceBusiness extends BaseBusiness<IResource> {}
export = ResourceBusiness;
