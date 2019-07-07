import { IComment } from '../models/interfaces';
import { CommentSchema } from '../data/schema/Comment';
import RepositoryBase from './base/RepositoryBase';

class CommentRepository extends RepositoryBase<IComment> {
  constructor() {
    super(CommentSchema);
  }
}

Object.seal(CommentRepository);
export = CommentRepository;
