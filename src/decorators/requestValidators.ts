import 'reflect-metadata';
import { MetadataKeys } from '../app/models/interfaces/custom/MetadataKeys';

export function requestValidators(...keys: string[]) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
