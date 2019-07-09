import IReadController from './../common/ReadController';
import IWriteController from './../common/WriteController';
import { ApiResponse } from '../../../app/models/interfaces/custom/ApiResponse';

interface IBaseController extends IReadController, IWriteController {}

export = IBaseController;
