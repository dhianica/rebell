import * as express from 'express';
// import ProductService from './product.service';

class UserController {
  private posts: any[] = [
    {
      name: 'Marcin',
      author: 'Dolor sit amet',
      title: 'Lorem Ipsum'
    }
  ];
  getAllUsers = (
    req: express.Request,
    res: express.Response
  ): void => {
    res.send(this.posts);
  };

  createAUser = (
    req: express.Request,
    res: express.Response
  ): void => {
    const post: any = req.body;
    this.posts.push(post);
    res.send(post);
  };
}

export default new UserController();
