import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UpdateConversationDto } from './conversation.dto';
import { Conversation } from './conversations.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async getAllConversationByUserId(userId: number) {
    return await this.conversationRepository.find({
      where: [
        { userOne: { id: userId }, isActive: true },
        { userTwo: { id: userId }, isActive: true },
      ],
      relations: [
        'userOne',
        'userTwo',
        'userOne.images',
        'userTwo.images',
        'userOne.profile',
        'userTwo.profile',
        'userOne.userHobbies',
        'userOne.userHobbies.hobby',
        'userTwo.userHobbies',
        'userTwo.userHobbies.hobby',
      ],
      order: { updatedAt: 'DESC' },
    });
  }

  async create(userOne: User, userTwo: User) {
    const newConversation = await this.conversationRepository.save({
      userOne,
      userTwo,
    });
    return newConversation;
  }

  async getConversationById(id: number) {
    return await this.conversationRepository.findOne({
      where: { id },
      relations: [
        'userOne',
        'userTwo',
        'userOne.images',
        'userTwo.images',
        'userOne.profile',
        'userTwo.profile',
      ],
    });
  }

  async update(id: number, userId: number, body: UpdateConversationDto) {
    const conversation = await this.conversationRepository.findOne({
      where: [
        { id, userOne: { id: userId } },
        { id, userTwo: { id: userId } },
      ],
    });
    if (!conversation) throw new BadRequestException('Not found conversation');

    conversation.updatedAt = new Date();
    if (body.isActive !== undefined) conversation.isActive = body.isActive;
    if (body.latestMessage !== undefined)
      conversation.latestMessage = body.latestMessage;

    return await this.conversationRepository.save(conversation);
  }
}
