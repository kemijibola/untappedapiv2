import IReadController from './../common/ReadController';
import IWriteController from './../common/WriteController';
import IBaseBusiness from '../../../app/business/interfaces/base/BaseBusiness';

interface BaseController extends IReadController, IWriteController {}

export = BaseController;
