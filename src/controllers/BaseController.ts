import { Response } from 'express';
import { ApiResponse } from '../app/models/interfaces/custom/ApiResponse';

export class BaseController<T> {
  transformResponse = (res: Response, params: ApiResponse<T>): void => {
    res.json({
      status: params.status,
      message: params.message,
      data: params.data
    });
  };
}
