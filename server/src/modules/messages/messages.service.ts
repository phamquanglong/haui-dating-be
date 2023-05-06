import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationsService } from '../conversations/conversations.service';
import { User } from '../users/user.entity';
import { PostMessageDto, UpdateMessageDto } from './message.dto';
import { Message } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private conversationService: ConversationsService,
  ) {}

  async getMessagesByConversationId(conversationId: number) {
    return await this.messagesRepository.find({
      where: { conversation: { id: conversationId } },
      relations: ['sender', 'sender.images'],
      order: { id: 'asc' },
    });
  }

  async postMessage(user: User, body: PostMessageDto) {
    const conversation = await this.conversationService.getConversationById(
      body.conversationId,
    );

    return await this.messagesRepository.save({
      conversation,
      sender: user,
      message: body.message,
    });
  }

  async updateMessage(id: number, user: User, body: UpdateMessageDto) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['sender'],
    });

    if (message.sender.id === user.id && body.isDelete !== undefined)
      message.userDelete = user.id;

    if (message.sender.id !== user.id && body.isSeen !== undefined)
      message.isSeen = true;

    return await this.messagesRepository.save(message);
  }
}
