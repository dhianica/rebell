import { groupBy, isEmpty } from '../utils/index.util';

export interface IConfiguration { name: string; value: string }

export class Configuration {

  private static item: IConfiguration[]  = [];

  public constructor() {
    throw new Error('Dont use this constructor!');
  }
  /**
   * Is Function for add configuration
   * @param item interface configuration
   */
  public static add(item: IConfiguration): void {
    Configuration.item.push(item)
  }
  /**
   * Is function for get configuration by groupping
   * @returns interface configuration with groupping data by name
   */
  public static groupping(): Map<string, IConfiguration[]> {
    return groupBy(Configuration.item, x => x.name);
  }
  /**
   * Is Function for get configuration global
   * @param filter is value by name for filter data (optional)
   * @returns interface Configuration
   */
  public static get(filter?: string): IConfiguration | IConfiguration[] {
    if (!isEmpty(filter))
      return Configuration.item.filter(x => x.name === filter).map((obj) => obj) as unknown as IConfiguration
    return Configuration.item
  }

  /**
   * Is Function for reset configuration
   */
  public static reset(): void {
    Configuration.item = []
  }
}

