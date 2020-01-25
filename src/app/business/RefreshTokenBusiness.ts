import RefreshTokenRepository from "../repository/RefreshTokenRepository";
import IRefreshTokenBusiness = require("./interfaces/RefreshTokenBusiness");
import { IRefreshToken } from "../models/interfaces";
import { Result } from "../../utils/Result";

class RefreshTokenBusiness implements IRefreshTokenBusiness {
  private _refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    this._refreshTokenRepository = new RefreshTokenRepository();
  }

  async fetch(condition: any): Promise<Result<IRefreshToken[]>> {
    const refreshTokens = await this._refreshTokenRepository.fetch(condition);
    return Result.ok<IRefreshToken[]>(200, refreshTokens);
  }

  async findById(id: string): Promise<Result<IRefreshToken>> {
    if (!id) return Result.fail<IRefreshToken>(400, "Bad request");
    const refreshToken = await this._refreshTokenRepository.findById(id);
    if (!refreshToken)
      return Result.fail<IRefreshToken>(404, `Referesh token not found`);
    return Result.ok<IRefreshToken>(200, refreshToken);
  }

  async findOne(condition: any): Promise<Result<IRefreshToken>> {
    if (!condition) return Result.fail<IRefreshToken>(400, "Bad request");
    const refreshToken = await this._refreshTokenRepository.findByOne(
      condition
    );
    if (!refreshToken)
      return Result.fail<IRefreshToken>(404, `Refresh token not found`);
    return Result.ok<IRefreshToken>(200, refreshToken);
  }

  async findByCriteria(criteria: any): Promise<Result<IRefreshToken>> {
    const refreshToken = await this._refreshTokenRepository.findByCriteria(
      criteria
    );
    if (!refreshToken)
      return Result.fail<IRefreshToken>(404, `Refresh token not found`);
    return Result.ok<IRefreshToken>(200, refreshToken);
  }

  async create(item: IRefreshToken): Promise<Result<IRefreshToken>> {
    item.isExpired = false;
    const newResource = await this._refreshTokenRepository.create(item);
    return Result.ok<IRefreshToken>(201, newResource);
  }

  async update(
    id: string,
    item: IRefreshToken
  ): Promise<Result<IRefreshToken>> {
    const refreshToken = await this._refreshTokenRepository.findById(id);
    if (!refreshToken)
      return Result.fail<IRefreshToken>(404, "Refresh token not found");

    item.ownerId = refreshToken.ownerId;
    item.createdAt = refreshToken.createdAt;
    item.application = refreshToken.application;
    const updateObj = await this._refreshTokenRepository.update(
      refreshToken._id,
      item
    );
    return Result.ok<IRefreshToken>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._refreshTokenRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(RefreshTokenBusiness);
export = RefreshTokenBusiness;
