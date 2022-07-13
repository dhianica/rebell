import * as path from 'path';

class Utils {
  setUrlRoute(basePath: string, subPath: string | ''): string {
    if(!!subPath) 
      throw new Error("Subpath cannot null!");
    else {
      return `${basePath}${/\/[^\/]*.*\.*\//.exec(subPath)![0]}`;
    }
  }
  getLastDirectory(currentDirectory: string): string {
    return path.basename(path.resolve(currentDirectory));
  }
}


export default new Utils();