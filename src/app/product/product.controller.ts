import * as express from 'express';

class ProductController {
  private posts: any[] = [
    {
      name: 'Marcin',
      author: 'Dolor sit amet',
      title: 'Lorem Ipsum'
    }
  ];
  getAllProducts = (
    req: express.Request,
    res: express.Response
  ): void => {
    res.send(this.posts);
  };

  createAProduct = (
    req: express.Request,
    res: express.Response
  ): void => {
    const post: any = req.body;
    this.posts.push(post);
    res.send(post);
  };
}

export default new ProductController();
