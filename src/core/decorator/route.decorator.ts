import { RouteDecoratorFactory } from './base.decorator'
import { HttpMethods, MetadataKeys } from '../enum'

export const Get = RouteDecoratorFactory(HttpMethods.GET);
export const Post = RouteDecoratorFactory(HttpMethods.POST);
export const Delete = RouteDecoratorFactory(HttpMethods.DELETE);
export const Options = RouteDecoratorFactory(HttpMethods.OPTIONS);
export const Put = RouteDecoratorFactory(HttpMethods.PUT);
