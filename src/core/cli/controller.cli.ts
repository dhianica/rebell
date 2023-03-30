import fse from 'fs-extra'
import path from 'path'

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const scripts = () => `

class ClassNameController {
  
  private ClassName = [{
    ClassNameID: 1,
    ClassName_Name: 'ClassName 1'
  }, {
    ClassNameID: 2,
    ClassNameName: 'ClassName 2'
  }]

  @Get('/')
  public async getAllClassName(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        response.json({
          detail: this.ClassName
        })
      } catch (error: any) {
        next(error)
      }
    })
  }

  @Get(':id')
  public async getClassNameByID(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        const { id } = request.params
        if (!isNumber(id))
          throw customError({
            message: EErrorMessage.INVALID_DATA,
            errorPath: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + getMethodName(new Error()),
            errorCode: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + generateCode(4)
          })

        const result = this.ClassName.find(x => x.ClassNameID === parseInt(id, 10))
        response.json({
          message: ESuccessMessage.FOUND,
          detail: result
        })
      } catch (error: any) {
        next(error)
      }
    })
  }
}
  
export default new ClassNameController();`

const makeRequest = (name: string): void => {

  // console.log("Model name: ", name)
  if (!name) {
    console.log('name is undefined')
    return
  }

  const importLib = [];
  const file = path.join(`src/app/${name}`, `${name}.controller.ts`)
  if (!fse.existsSync(file))
    fse.ensureFile(file, (errEnsure) => {
      if (errEnsure) {
        console.log('\x1b[31m', 'errEnsure', errEnsure, '\x1b[0m')
        return;
      }
      // add path tree
      importLib.push(`import type { Request, Response, NextFunction }  from 'express';`)
      importLib.push(`import { customError } from '../../core/error';`)
      importLib.push(`import { EErrorMessage, EErrorCode, EApp, ESuccessMessage } from '../../core/enum'`)
      importLib.push(`import { generateCode, getMethodName, isNumber } from '../../utils/index.util'`)
      importLib.push(`import { Get, Post } from '../../core/decorator'`)

      // change class name from default script
      const content = scripts().replace(/ClassName/g, capitalizeFirstLetter(name))

      // adding import packages on top of line
      const lines = content.split('\n')
      lines[0] = importLib.join('\n') + lines[0]
      const updatedContent = lines.join('\n')

      fse.writeFile(file, updatedContent, (errWrite) => {
        if (errWrite) {
          console.log('\x1b[31m', 'errWrite', errWrite, '\x1b[0m')
          return;
        }
        console.log('\x1b[32m', `Controller created: ${file}`, '\x1b[0m')
      });
    })

  else
    console.log('\x1b[31m', `Controller already exists: ${file}`, '\x1b[0m')

}


export default makeRequest
