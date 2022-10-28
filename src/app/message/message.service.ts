import * as express from 'express';

class MessageService {
  private posts: any[] = [
    {
      name: 'Marcin'
    }
  ];

  public getAllEmployees = (req: express.Request, res: express.Response): void => {
    res.send(this.posts);
  };
}

export default new MessageService();
