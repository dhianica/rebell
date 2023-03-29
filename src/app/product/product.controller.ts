import type { Request, Response, NextFunction }  from 'express';
import { customError } from '../../core/error';
import { EErrorMessage, EErrorCode, EApp, ESuccessMessage } from '../../core/enum'
import { generateCode, getMethodName, isNumber } from '../../utils/index.util'
import { Get, Post } from '../../core/decorator'

class ProductController {

  private Product = [{
    Product_ID: 1,
    Product_Name: 'Product 1'
  }, {
    Product_ID: 2,
    Product_Name: 'Product 2'
  }]

  @Get('/')
  public async getAllProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        response.json({
          detail: this.Product
        })
      } catch (error: any) {
        next(error)
      }
    })
  }

  @Get(':id')
  public async getProductByID(
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
            errorCode: '',
            errorPath: ''
          })

        const result = this.Product.find(x => x.Product_ID === parseInt(id, 10))
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

export default new ProductController();
