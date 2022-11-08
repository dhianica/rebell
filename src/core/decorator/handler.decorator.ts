import { DecoratorFactory } from './base.decorator'
import { HttpMethods } from '../enum'

export const Get = DecoratorFactory(HttpMethods.GET);
export const Post = DecoratorFactory(HttpMethods.POST);
export const Delete = DecoratorFactory(HttpMethods.DELETE);
export const Options = DecoratorFactory(HttpMethods.OPTIONS);
export const Put = DecoratorFactory(HttpMethods.PUT);
