import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationsService } from '../conversations/conversations.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import {
  TYPE,
  UserActionQueryDto,
  UserActionRequestDto,
} from './user-actions.dto';
import { UserActions } from './user-actions.entity';

@Injectable()
export class UserActionsService {
  constructor(
    @InjectRepository(UserActions)
    private userActionsRepository: Repository<UserActions>,
    private readonly usersService: UsersService,
    private readonly conversationService: ConversationsService,
  ) {}

  async getAll() {
    return await this.userActionsRepository.find({
      relations: ['user', 'targetUser'],
    });
  }

  async getAllActionOfUser(userId: number) {
    return await this.userActionsRepository.find({
      where: { user: { id: userId } },
      relations: ['targetUser'],
    });
  }

  async getHistory(userId: number, { type }: UserActionQueryDto) {
    if (type === TYPE.LIKED)
      return await this.userActionsRepository
        .createQueryBuilder('userActions')
        .leftJoinAndSelect('userActions.user', 'user.userActionUser')
        .leftJoinAndSelect('userActions.targetUser', 'user.userActionTarget')
        .where(
          `userActions.user.id = :userId AND userActions.action = 'like'`,
          {
            userId: userId,
          },
        )
        .getMany();
    if (type === TYPE.DISLIKED)
      return await this.userActionsRepository
        .createQueryBuilder('userActions')
        .leftJoinAndSelect('userActions.user', 'user.userActionUser')
        .leftJoinAndSelect('userActions.targetUser', 'user.userActionTarget')
        .where(
          `userActions.user.id = :userId AND userActions.action = 'dislike'`,
          {
            userId: userId,
          },
        )
        .getMany();

    if (type === TYPE.LIKED_ME)
      return await this.userActionsRepository
        .createQueryBuilder('userActions')
        .leftJoinAndSelect('userActions.user', 'user.userActionUser')
        .leftJoinAndSelect('userActions.targetUser', 'user.userActionTarget')
        .where(
          `userActions.targetUser.id = :targetUserId AND userActions.action = 'like'`,
          {
            targetUserId: userId,
          },
        )
        .getMany();
  }

  async create(user: User, body: UserActionRequestDto) {
    const targetUser = await this.usersService.getUser({
      id: body.targetUserId,
    });

    if (!targetUser) throw new BadRequestException('Target user not found.');

    const isMatch = await this.userActionsRepository
      .createQueryBuilder('userActions')
      .leftJoinAndSelect('userActions.user', 'user.userActionUser')
      .leftJoinAndSelect('userActions.targetUser', 'user.userActionTarget')
      .where(
        `userActions.user.id = :targetUserId AND userActions.targetUser.id = :userId AND userActions.action = 'like'`,
        {
          userId: user.id,
          targetUserId: targetUser.id,
        },
      )
      .getOne();

    const newUserAction = await this.userActionsRepository.save({
      user,
      targetUser,
      action: body.action,
    });

    if (isMatch) {
      const newConversation = await this.conversationService.create(
        user,
        targetUser,
      );
      return { newConversation, newUserAction };
    }
    return newUserAction;
  }
}
