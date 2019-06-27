import BaseBusiness = require('./base/BaseBusiness');
import { IPortfolio } from '../../models/interfaces';

interface PortfolioBusiness extends BaseBusiness<IPortfolio> {}
export = PortfolioBusiness;
