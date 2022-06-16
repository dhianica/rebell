import * as express from "express";
// import ProductService from "./product.service";

class ProductController {
  private posts: any[] = [
    {
      name: "Marcin",
      author: "Dolor sit amet",
      title: "Lorem Ipsum",
    },
  ];
  public getAllProducts = (request: express.Request, response: express.Response) => {
    response.send(this.posts);
  };

  public createAProduct = (request: express.Request, response: express.Response) => {
    const post: any = request.body;
    this.posts.push(post);
    response.send(post);
  };
}

export default new ProductController();
