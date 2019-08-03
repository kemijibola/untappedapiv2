import 'reflect-metadata';
import { MetadataKeys } from '../app/models/interfaces/custom/MetadataKeys';

export function authorize(...keys: string[]) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.authorization, keys, target, key);
  };
}
