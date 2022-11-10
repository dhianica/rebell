import { RouteDecoratorFactory } from './base.decorator'
import { HttpMethods, MetadataKeys } from '../enum'

/**
 * This core/decorator/route.decorator.ts
 *
 * FEATURES
 * Generate route using decorator
 * Generate endpoint using name function controller if endpoint route not defined
 *
*/

export const Get = RouteDecoratorFactory(HttpMethods.GET);
export const Post = RouteDecoratorFactory(HttpMethods.POST);
export const Delete = RouteDecoratorFactory(HttpMethods.DELETE);
export const Options = RouteDecoratorFactory(HttpMethods.OPTIONS);
export const Put = RouteDecoratorFactory(HttpMethods.PUT);
