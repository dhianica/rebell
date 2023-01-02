import * as path from 'path';
import crypto from 'crypto';

/**
 *
 * This is function for convert a string to style CamelCase
 *
 * @param str string - params want to be convert
 * @returns string - string with camelCase
 */
export const camelCase = (str: string): string =>
  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) =>
    chr.toUpperCase());
/**
 *
 * This is function for get last directory from path
 *
 * @param currentDirectory string - params want to be get a last directory from path
 * @returns string - string name last directory
 */
export const getLastDirectory = (currentDirectory: string): string =>
  path.basename(path.resolve(currentDirectory));

/**
 * This is function for get the key from value enum
 *
 * @param myEnum any - data enum want to be check
 * @param enumValue number | string - value want to be your get the key
 * @returns string - key from value you check
 */
export function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : '';
}


// /**
//  *
//  * This is function for grouping array with specifiec key
//  *
//  * @param arr Array - data want to be grouping
//  * @param key any - key want to be gropuing example: x => x.name
//  * @returns Array -> array with new format grouping
//  */
export function groupBy<K, V>(array: V[], grouper: (item: V) => K): Map<K, V[]> {
  return array.reduce((store, item) => {
    const key = grouper(item);
    if (!store.has(key))
      store.set(key, [item]);
    else
      store.get(key)?.push(item);

    return store;
  }, new Map<K, V[]>());
}

export function transformMap<K, V, R>(
  source: Map<K, V>,
  transformer: (value: V, key: K) => R
): Map<K, R>{
  return new Map(
    Array.from(source, v => [v[0], transformer(v[1], v[0])])
  );
}

export function mapToObj<T>(m: Map<string, T>): { [key: string]: T } {
  return Array.from(m).reduce((obj: { [key: string]: T }, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}

export function mapToArray<K, V, R>(
  m: Map<K, V>,
  transformer: (key: K, item: V) => R
): Array<R> {
  return Array.from(m.entries()).map(x => transformer(x[0], x[1])
  );
}

/**
 *
 * This is function for convert array to be flatten
 *
 * @param arrs Array - data want to be convert to flatten
 * @returns Array - array with format flatten
 */
export const flatten = <T>(arrs: Array<Array<T>>): Array<T> => ([] as Array<T>).concat(...arrs);

/**
 *
 * This is function for generate data number with range
 *
 * @param start number - params start number want to be generate
 * @param end number - params end number want to be generate
 * @param step number - params step number row arithmatic want to be
 * @returns number - array with range
 */
export const range = (start: number, end: number, step: number = 1): Array<number> =>
  [...Array(Math.ceil(end / step)).keys()].map(i => i * step + start);

/**
 *
 * This is function for convert query params from URL to Object Json
 *
 * @param str : string -> query params from URL
 * @returns : object
 */
export const convertParamToObject = (str: string): Object => Object.fromEntries(new URLSearchParams(str))

export const objectEntries = (obj: Object): any => {
  let index = 0;

  // In ES6, you can use strings or symbols as property keys,
  // Reflect.ownKeys() retrieves both
  const propKeys = Reflect.ownKeys(obj);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < propKeys.length) {
        const key = propKeys[index];
        index++;
        return { value: [key, obj[key]]};
      } else {
        return { done: true };
      }
    }
  };
}

/**
 * This is function for generate unique code
 *
 * @param len number - params for generate total length string
 * @returns  string - unique string
 */
export const generateCode = (len: number = 3): string => crypto.randomBytes(len).toString('hex').toUpperCase()

/**
 * This is function for get method name using new Error
 *
 * @param len number - params new Error
 * @returns  string - method name
 */
export const getMethodName = (error: Error): string => /at \w+\.(\w+)/.exec(error.stack)[0].replace(/at /, '') // we want the 2nd method in the call stack

export function getSafe(fn: Function, defaultVal: any): void  {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

/**
 * This is function for convert string of array to array
 *
 * @param n string - params string of array
 * @returns array - array data from string with commas separated
 */
export const stringToArray = (n: string): any => n.replace(/\[|\]/g, '').split(',')

