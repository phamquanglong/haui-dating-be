import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/modules/users/user.entity';

@WebSocketGateway(8080, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor() {}

  async handleConnection(client: Socket) {
    console.log(
      '🚀 ~ file: app.gateway.ts:21 ~ AppGateway ~ handleConnection ~ client:',
      client?.handshake?.query?.token,
    );

    // const information: SaveInformationDto = {
    //   user_id: user.id,
    //   type: TypeInformation.socket_id,
    //   status: false,
    //   value: client.id,
    // };

    // await this.informationService.create(information);
  }

  async handleDisconnect(client: Socket) {
    // const user = await this.getDataUserFromToken(client);
    // await this.informationService.deleteByValue(user.id, client.id);

    // need handle remove socketId to information table
    console.log('disconnect');
  }
}
