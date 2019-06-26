import 'reflect-metadata';
import { Methods } from '../app/models/interfaces/custom/Methods';
import { MetadataKeys } from '../app/models/interfaces/custom/MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

export function routeBinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
