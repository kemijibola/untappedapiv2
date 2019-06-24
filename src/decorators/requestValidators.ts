import 'reflect-metadata';
import { MetadataKeys } from '../interfaces/MetadataKeys';

export function requestValidators(requestType: string, ...keys: string[]) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
    Reflect.defineMetadata(MetadataKeys.requesttype, requestType, target, key);
  };
}
