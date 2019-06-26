import {
  IPortfolio,
  IUser,
  MediaType,
  UploadType,
  ICollection
} from './interfaces';

class PortfolioModel {
  private _portfolioModel: IPortfolio;
  constructor(portfolioModel: IPortfolio) {
    this._portfolioModel = portfolioModel;
  }

  get title(): string {
    return this._portfolioModel.title;
  }
  get description(): string {
    return this._portfolioModel.description;
  }
  get user(): IUser {
    return this._portfolioModel.user;
  }
  get mediaType(): MediaType {
    return this._portfolioModel.mediaType;
  }
  get uploadType(): UploadType {
    return this._portfolioModel.uploadType;
  }
  get items(): ICollection[] {
    return this._portfolioModel.items;
  }
}

Object.seal(PortfolioModel);
export = PortfolioModel;
