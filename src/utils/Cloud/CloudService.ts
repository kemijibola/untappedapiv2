import { Model } from './Model';
import { Bucket } from '../../app/models/interfaces/custom/Bucket';
import { AwsStorage } from './AwsStorage';

export class AWS extends Model<Bucket> {
  static setUpCloud(config: Bucket): AWS {
    return new AWS(new AwsStorage(config));
  }
}
