import BaseBusiness = require('./base/BaseBusiness');
import { IEvaluation } from '../../models/interfaces';

interface EvaluationBusiness extends BaseBusiness<IEvaluation> {}
export = EvaluationBusiness;
