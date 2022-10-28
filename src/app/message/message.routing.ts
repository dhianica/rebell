import Route from '../../core/route';
import MessageController from './message.controller';

class MessageRouter extends Route {
  public path = '/message';
  private controller = MessageController;

  public constructor(schemaName: string) {
    super(schemaName, false);
    this.get('/', this.controller.getAllMessages);
  }
}

export default MessageRouter;
