import 'reflect-metadata';
import  '../types/router.type';
import { HttpMethods, MetadataKeys } from '../enum'

const ReflectDetector = (path: string = '', method: string = HttpMethods.GET, target: any, propertyKey?: any): void => {
  // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
  // To prevent any further validation simply set it to an empty array here.
  if (!Reflect.hasOwnMetadata(MetadataKeys.ROUTERS, target.constructor)) {
    Reflect.defineMetadata(MetadataKeys.ROUTERS, [], target.constructor);
  }
  // Get the routes stored so far, extend it by the new route and re-set the metadata.
  const routes = Reflect.getMetadata(MetadataKeys.ROUTERS, target.constructor) as Array<RouterTypes>;
  routes.push({
    requestMethod: method,
    path: path === '' ? propertyKey : path,
    methodName: propertyKey
  });
  Reflect.defineMetadata(MetadataKeys.ROUTERS, routes, target.constructor);
}

export function getDecorator (metadataKey: MetadataKeys, target: any): any {
  return Reflect.getMetadata(metadataKey, target.constructor) as Array<RouterTypes>
}
export function Get(path?: string): MethodDecorator {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: any): void => {
    ReflectDetector(path, HttpMethods.GET, target, propertyKey)
  };
};
export function Post(path?: string): MethodDecorator{
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: any): void => {
    ReflectDetector(path, HttpMethods.POST, target, propertyKey)
  };
};
export function Delete(path?: string): MethodDecorator{
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: any): void => {
    ReflectDetector(path, HttpMethods.DELETE, target, propertyKey)
  };
};
export function Options(path?: string): MethodDecorator{
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: any): void => {
    ReflectDetector(path, HttpMethods.OPTIONS, target, propertyKey)
  };
};
export function Put(path?: string): MethodDecorator{
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: any): any => {
    ReflectDetector(path, HttpMethods.PUT, target, propertyKey)
  };
};
export const deprecated = (deprecationReason: string) => {
  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor): any=> {
    return {
      get(): any {
        const wrapperFn = (...args: any[]): void=> {
          console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
          propertyDescriptor.value.apply(this, args)
        }

        Object.defineProperty(this, memberName, {
          value: wrapperFn, 
          configurable: true,
          writable: true
        });
        return wrapperFn;
      }
    }
  }
}
