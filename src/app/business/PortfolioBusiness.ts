import PortfolioRepository from '../repository/PortfolioRepository';
import IPortfolioBusiness from './interface/PortfolioBusiness';
import { IPortfolio } from '../models/interfaces';

class PortfolioBusiness implements IPortfolioBusiness {
  private _portfolioRepository: PortfolioRepository;

  constructor() {
    this._portfolioRepository = new PortfolioRepository();
  }

  create(item: IPortfolio, callback: (error: any, result: any) => void) {
    this._portfolioRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._portfolioRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IPortfolio,
    callback: (error: any, result: any) => void
  ) {
    this._portfolioRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._portfolioRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._portfolioRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IPortfolio) => void) {
    this._portfolioRepository.findById(_id, callback);
  }
}
Object.seal(PortfolioBusiness);
export = PortfolioBusiness;
