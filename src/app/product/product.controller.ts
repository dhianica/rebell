import type { Request, Response, NextFunction }  from 'express';
import { customError, EErrorMessage, EErrorCode, EApp, ESuccessMessage, Get, Post } from 'rebell-core'
import { generateCode, getMethodName, isNumber } from 'rebell-utils'

class ProductController {

  private Product = [{
    ProductID: 1,
    Product_Name: 'Product 1'
  }, {
    ProductID: 2,
    ProductName: 'Product 2'
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
            errorPath: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + getMethodName(new Error()),
            errorCode: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + generateCode(4)
          })

        const result = this.Product.find(x => x.ProductID === parseInt(id, 10))
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
