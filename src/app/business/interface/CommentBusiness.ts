import BaseBusiness = require('./base/BaseBusiness');
import { IComment } from '../../models/interfaces';

interface CommentBusiness extends BaseBusiness<IComment> {}
export = CommentBusiness;
