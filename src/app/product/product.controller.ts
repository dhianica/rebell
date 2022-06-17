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
  public getAllProducts = (
    req: express.Request,
    res: express.Response
  ) => {
    res.send(this.posts);
  };

  public createAProduct = (
    req: express.Request,
    res: express.Response
  ) => {
    const post: any = req.body;
    this.posts.push(post);
    res.send(post);
  };
}

export default new ProductController();
