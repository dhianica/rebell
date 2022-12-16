import { RouteDecoratorFactory } from './base.decorator'
import { EHttpMethods, EMetadataKeys } from '../enum'

/**
 * This core/decorator/route.decorator.ts
 *
 * FEATURES
 * Generate route using decorator
 * Generate endpoint using name function controller if endpoint route not defined
 *
*/

export const Get = RouteDecoratorFactory(EHttpMethods.GET);
export const Post = RouteDecoratorFactory(EHttpMethods.POST);
export const Delete = RouteDecoratorFactory(EHttpMethods.DELETE);
export const Options = RouteDecoratorFactory(EHttpMethods.OPTIONS);
export const Put = RouteDecoratorFactory(EHttpMethods.PUT);
