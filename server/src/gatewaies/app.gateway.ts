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
import { UsersService } from 'src/modules/users/users.service';
import { WS_EVENT } from 'src/utils/constant';
import { Message, SetTypingStatusRequest } from './gateway.interface';
import * as lodash from 'lodash';

@WebSocketGateway(8080, {
  cors: {
    origin: 'http://172.20.10.3:9000',
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
    console.log('connected');
    await this.userSocketService.create(userId, client?.id);

    const allConnection = await this.userSocketService.getAll();
    console.log('all user (connect): ', allConnection);
    // await this.userSocketService.deleteAll();

    // this.server.emit(WS_EVENT.RECEIVE_USERS_ONLINE, allConnection);
    await this.sendOnlinePartnersAndNotifyConnectedToPartners(userId);
  }

  async handleDisconnect(client: Socket) {
    const userId = await this.validation(client);
    await this.userSocketService.delete(client?.id);
    console.log('disconnected');
    const allConnection = await this.userSocketService.getAll();
    console.log('all user (disconnect): ', allConnection);

    // this.server.emit(WS_EVENT.RECEIVE_USERS_ONLINE, allConnection);
    await this.sendOnlinePartnersAndNotifyConnectedToPartners(userId);
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

  async sendOnlinePartnersAndNotifyConnectedToPartners(userId: number) {
    await this.sendOnlinePartners(userId);
    const partnersOfUser = await this.userService.getAllPartnersByUserId(
      userId,
    );
    partnersOfUser.forEach(
      async (partner) => await this.sendOnlinePartners(partner),
    );
  }

  async sendOnlinePartners(userId: number) {
    const partnersOfUser = await this.userService.getAllPartnersByUserId(
      userId,
    );
    const allConnection = await this.userSocketService.getAll();

    const partnersConnection = allConnection.filter((connection) =>
      lodash.includes(partnersOfUser, connection.userId),
    );

    const userConnection = allConnection.find(
      (connection) => userId === connection.userId,
    );

    this.server
      .to(userConnection?.socketId)
      .emit(WS_EVENT.RECEIVE_USERS_ONLINE, partnersConnection);
  }

  @SubscribeMessage(WS_EVENT.SEND_MESSAGE)
  async sendMessage(client: Socket, payload: Message) {
    try {
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
      await this.conversationService.update(conversation?.id, userId, {
        isActive: true,
      });

      listUserSocket.map((userSocket) => {
        this.server
          .to(userSocket.socketId)
          .emit(WS_EVENT.RECEIVE_MESSAGE, newMessage);
      });
      console.log('=====================================================');
    } catch (error) {
      console.log({ error });
    }
  }

  @SubscribeMessage(WS_EVENT.TYPING)
  async setTypingStatus(client: Socket, payload: SetTypingStatusRequest) {
    const userId = await this.validation(client);
    const conversation = await this.conversationService.getConversationById(
      payload.conversationId,
    );

    const partnerId = [conversation.userOne.id, conversation.userTwo.id].filter(
      (el) => el !== userId,
    );
    const partnerSocket = await this.userSocketService.findSocketsByUserIds(
      partnerId,
    );

    partnerSocket.map((userSocket) => {
      this.server.to(userSocket.socketId).emit(WS_EVENT.TYPING_RES, payload);
    });
  }
  @SubscribeMessage(WS_EVENT.SEEN_MESSAGE)
  async seenMessage(client: Socket, payload: { conversationId: number }) {
    const userId = await this.validation(client);
    const user = await this.userService.getUser({ id: userId });
    const conversation = await this.conversationService.getConversationById(
      payload.conversationId,
    );

    const listMessageOfPartner = (
      await this.messageService.getMessagesByConversationId(
        payload?.conversationId,
      )
    ).filter((mess) => mess?.sender?.id !== userId);

    await Promise.all(
      listMessageOfPartner.map(
        async (mess) =>
          await this.messageService.updateMessage(mess?.id, user, {
            isSeen: true,
          }),
      ),
    ).then(async () => {
      const listUserReceiveMessage = [
        conversation.userOne.id,
        conversation.userTwo.id,
      ].filter((id) => id !== userId);
      const listUserSocket = await this.userSocketService.findSocketsByUserIds(
        listUserReceiveMessage,
      );

      listUserSocket.map((userSocket) => {
        this.server
          .to(userSocket.socketId)
          .emit(WS_EVENT.RECEIVE_UPDATE_IS_SEEN_MESSAGE, { isSeen: true });
      });
    });
  }
  @SubscribeMessage(WS_EVENT.DELETE_MESSAGE)
  async deleteMessage(
    client: Socket,
    payload: { messageId: number; conversationId: number },
  ) {
    const userId = await this.validation(client);
    const user = await this.userService.getUser({ id: userId });
    const conversation = await this.conversationService.getConversationById(
      payload.conversationId,
    );

    await this.messageService
      .updateMessage(payload?.messageId, user, {
        isDelete: true,
      })
      .then(async () => {
        const listUserReceiveMessage = [
          conversation.userOne.id,
          conversation.userTwo.id,
        ];
        const listUserSocket =
          await this.userSocketService.findSocketsByUserIds(
            listUserReceiveMessage,
          );

        listUserSocket.map((userSocket) => {
          this.server
            .to(userSocket.socketId)
            .emit(WS_EVENT.RECEIVE_DELETE_MESSAGE, {
              messId: payload?.messageId,
              userDelete: userId,
            });
        });
      });
  }
  @SubscribeMessage(WS_EVENT.UNMATCH)
  async unmatch(client: Socket, payload: { conversationId: number }) {
    const userId = await this.validation(client);
    const conversation = await this.conversationService.getConversationById(
      payload.conversationId,
    );

    await this.conversationService
      .update(payload?.conversationId, userId, {
        isActive: false,
      })
      .then(async () => {
        const listUserReceiveMessage = [
          conversation.userOne.id,
          conversation.userTwo.id,
        ];
        const listUserSocket =
          await this.userSocketService.findSocketsByUserIds(
            listUserReceiveMessage,
          );

        listUserSocket.map((userSocket) => {
          this.server.to(userSocket.socketId).emit(WS_EVENT.RECEIVE_UNMATCH, {
            conversationId: payload?.conversationId,
            isActive: false,
          });
        });
      });
  }

  @SubscribeMessage(WS_EVENT.CALL_VIDEO)
  async sendCallVideo(
    client: Socket,
    payload: { conversationId: number; offer: any },
  ) {
    const userId = await this.validation(client);
    const conversation = await this.conversationService.getConversationById(
      payload.conversationId,
    );

    const partnerId = [conversation.userOne.id, conversation.userTwo.id].filter(
      (el) => el !== userId,
    );
    const partnerSocket = await this.userSocketService.findSocketsByUserIds(
      partnerId,
    );

    partnerSocket.map((userSocket) => {
      this.server.to(userSocket.socketId).emit(WS_EVENT.RECEIVE_CALL_VIDEO, {
        conversationId: payload.conversationId,
        offer: payload.offer,
      });
    });
  }
}
