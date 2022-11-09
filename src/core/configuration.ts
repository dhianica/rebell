import { groupBy } from '../utils/index.util';

export interface IConfiguration { name: string; value: string }

export class Configuration {
  protected _configuration: IConfiguration[] = [];
  public addConfiguration(item: IConfiguration): void {
    this._configuration.push(item);
  }
  public configuration(): Map<string, IConfiguration[]> {
    return groupBy(this._configuration, x => x.name);
  }
}

