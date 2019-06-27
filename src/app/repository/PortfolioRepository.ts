import { IPortfolio } from '../models/interfaces';
import PortfolioSchema from '../data/schema/Portfolio';
import RepositoryBase from './base/RepositoryBase';

class PortfolioRepository extends RepositoryBase<IPortfolio> {
  constructor() {
    super(PortfolioSchema);
  }
}

Object.seal(PortfolioRepository);
export = PortfolioRepository;
