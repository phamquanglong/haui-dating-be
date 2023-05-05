import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/modules/conversations/conversations.entity';
import { ConversationsModule } from 'src/modules/conversations/conversations.module';
import { Message } from 'src/modules/messages/messages.entity';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { User } from 'src/modules/users/user.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    UsersModule,
    ConversationsModule,
    MessagesModule,
    TypeOrmModule.forFeature([User, Conversation, Message]),
    JwtModule.register({}),
  ],
  providers: [AppGateway],
  controllers: [],
})
export class GatewayModules {}
