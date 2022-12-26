import 'reflect-metadata';
import  type { IRouterTypes, ISchemaTypes } from '../type';
import { EHttpMethods, EMetadataKeys } from '../enum'

export const RouteDecoratorFactory = (method: EHttpMethods) =>
  (path?: string): MethodDecorator =>
    (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: IRouterTypes[] =   Reflect.hasMetadata(EMetadataKeys.ROUTERS, controllerClass) ?
        Reflect.getMetadata(EMetadataKeys.ROUTERS, controllerClass) : [];
      routers.push({
        method,
        path: !path ? propertyKey.toString() : path,
        handlerName: propertyKey
      });
      Reflect.defineMetadata(EMetadataKeys.ROUTERS, routers, controllerClass);
    }

export function GetDecorator (metadataKey: EMetadataKeys, target: any): any {
  return Reflect.getMetadata(metadataKey, target.constructor) as Array<IRouterTypes>
}

export const Deprecated = (deprecationReason: string) =>
  (target: any, memberName: string, propertyDescriptor: PropertyDescriptor): any => ({
    get(): any {
      const wrapperFn = (...args: any[]): void => {
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
  })
