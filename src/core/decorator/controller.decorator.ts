import 'reflect-metadata'
import { MetadataKeys } from '../enum'

const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.ROUTERS, basePath, target);
  };
}
export default Controller;
