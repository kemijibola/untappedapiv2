import { ObjectParam } from './AwsStorage';

interface ICloudStorage {
  getObject<T>(params: T): string;
  putObject<T>(params: T): void;
}

interface ICloudSchedule<T> {
  sendMessage<T>(params: T): string;
}

export class Model<T> {
  constructor(
    private storage: ICloudStorage // private schedule: ICloudSchedule<T>
  ) {}

  getObject(objParams: ObjectParam): string {
    return this.storage.getObject(objParams);
  }
  putObject() {}
  createSchedule() {}
  processSchedule() {}
}
