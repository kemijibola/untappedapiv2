import { IEvaluation } from '../models/interfaces';
import EvaluationSchema from '../data/schema/Evaluation';
import RepositoryBase from './base/RepositoryBase';

class EvauationRepository extends RepositoryBase<IEvaluation> {
  constructor() {
    super(EvaluationSchema);
  }
}

Object.seal(EvauationRepository);
export = EvauationRepository;
