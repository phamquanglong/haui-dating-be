import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from '../conversations/conversations.module';
import { MessagesController } from './messages.controller';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ConversationsModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
