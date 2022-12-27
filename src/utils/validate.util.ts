/**
 *
 * This is function for check params is empty or not
 *
 * @param param any - params want to be check
 * @returns boolean - true if param dont have value, default false
 */
export function isEmpty(param: any): boolean {
  if (param === undefined || param === null) return true
  else if (typeof param === 'object') return Object.keys(param).length < 1
  else if (typeof param === 'string') return param === '' || param.length < 1
  else if (Array.isArray(param)) return param.length < 1
  return false
}

/**
 * This is function for check validate date
 * @param param any - value want to check validate
 * @returns boolean - valid date
 */
export function isValidDate(param: any): boolean {
  return Object.prototype.toString.call(param) === '[object Date]';
}

/**
 * This is function for check validate number
 * @param param any - value want to check validate
 * @returns boolean - valid date
 */
export function isNumber(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * This is function for check validate string
 * @param param any - value want to check validate
 * @returns boolean - valid date
 */
export function isString(n: any): boolean {
  return typeof n === 'string';
}

/**
 * This is function for check validate object
 * @param param any - value want to check validate
 * @returns boolean - valid date
 */
export function isObject(n: any): boolean {
  return typeof n === 'object';
}
