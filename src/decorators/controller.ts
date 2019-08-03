import 'reflect-metadata';
import { AppRouter } from '../AppRouter';
import { Methods } from '../app/models/interfaces/custom/Methods';
import { MetadataKeys } from '../app/models/interfaces/custom/MetadataKeys';
import { requestValidators } from '../utils/lib/requestValidator';
import { authorizePermission } from '../utils/lib/authorizePermission';

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance;

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];
      const validator = requestValidators(requiredProps);

      const permissions =
        Reflect.getMetadata(
          MetadataKeys.authorization,
          target.prototype,
          key
        ) || [];
      const authorize = authorizePermission(permissions);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          authorize,
          routeHandler
        );
      }
    }
  };
}
