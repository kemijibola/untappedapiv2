import IReadController from './../common/ReadController';
import IWriteController from './../common/WriteController';
import { ApiResponse } from '../../../app/models/interfaces/custom/ApiResponse';

interface BaseController extends IReadController, IWriteController {}

export = BaseController;
