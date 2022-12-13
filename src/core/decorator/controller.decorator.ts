import 'reflect-metadata'
import { MetadataKeys } from '../enum'

export function Controller<T extends new(...args: any[]) => {}>(Base: T): any {
  return class extends Base {
    public constructor(...args: any[]) {
      super(...args);
      const subMethods = Base.prototype[MetadataKeys.ROUTERS];
      if (subMethods)
        subMethods.forEach((requestName: string, method: string) => {
          console.log('')
        });
    }
  };
}
