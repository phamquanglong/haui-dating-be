import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationsService } from 'src/modules/conversations/conversations.service';
import { MessagesService } from 'src/modules/messages/messages.service';
import { UserSocketService } from 'src/modules/user-socket/user-socket.service';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { WS_EVENT } from 'src/utils/constant';
import { Message } from './gateway.interface';

@WebSocketGateway(8080, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
    private jwtService: JwtService,
    private userSocketService: UserSocketService,
    private userService: UsersService,
    private conversationService: ConversationsService,
    private messageService: MessagesService,
  ) {}

  async handleConnection(client: Socket) {
    const userId = await this.validation(client);
    await this.userSocketService.create(userId, client?.id);

    // const allConnection = await this.userSocketService.getAll();
    // console.log('all user (connect): ', allConnection);
    // await this.userSocketService.deleteAll();
  }

  async handleDisconnect(client: Socket) {
    await this.userSocketService.delete(client?.id);
    // const allConnection = await this.userSocketService.getAll();
    // console.log('all user (disconnect): ', allConnection);

    console.log('disconnect');
  }

  async validation(client: Socket) {
    const accessToken = client?.handshake?.query?.token as string;
    try {
      const decode = this.jwtService.decode(accessToken) as any;
      return decode?.userId;
    } catch (error) {
      this.handleDisconnect(client);
    }
  }

  @SubscribeMessage(WS_EVENT.SEND_MESSAGE)
  async sendMessage(client: Socket, payload: Message) {
    const userId = await this.validation(client);
    const user = await this.userService.getUser({ id: userId });
    const conversation = await this.conversationService.getConversationById(
      payload.conversationId,
    );

    const listUserReceiveMessage = [
      conversation.userOne.id,
      conversation.userTwo.id,
    ];
    const listUserSocket = await this.userSocketService.findSocketsByUserIds(
      listUserReceiveMessage,
    );

    const newMessage = await this.messageService.postMessage(user, payload);

    listUserSocket.map((userSocket) => {
      this.server
        .to(userSocket.socketId)
        .emit(WS_EVENT.RECEIVE_MESSAGE, newMessage);
    });
  }
}