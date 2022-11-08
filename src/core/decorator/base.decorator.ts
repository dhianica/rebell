import 'reflect-metadata';
import  type { IRouterTypes } from'../types/router.type';
import { HttpMethods, MetadataKeys } from '../enum'

export const DecoratorFactory = (method: HttpMethods) => {
  return (path?: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: IRouterTypes[] =   Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
        Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];
      routers.push({
        method,
        path: !path ? propertyKey.toString() : path,
        handlerName: propertyKey
      });
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }
  }
}

export function GetDecorator (metadataKey: MetadataKeys, target: any): any {
  return Reflect.getMetadata(metadataKey, target.constructor) as Array<IRouterTypes>
}

export const Deprecated = (deprecationReason: string) => {
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
