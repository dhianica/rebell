import 'reflect-metadata'
import { EMetadataKeys } from '../enum'

export function Controller<T extends new(...args: any[]) => {}>(Base: T): any {
  return class extends Base {
    public constructor(...args: any[]) {
      super(...args);
      const subMethods = Base.prototype[EMetadataKeys.ROUTERS];
      if (subMethods)
        subMethods.forEach((requestName: string, method: string) => {
          console.log('')
        });
    }
  };
}
