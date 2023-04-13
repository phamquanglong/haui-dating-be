import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from '../conversations/conversations.module';
import { UsersModule } from '../users/users.module';
import { UserActionsController } from './user-actions.controller';
import { UserActions } from './user-actions.entity';
import { UserActionsService } from './user-actions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserActions]),
    UsersModule,
    ConversationsModule,
  ],
  controllers: [UserActionsController],
  providers: [UserActionsService],
  exports: [UserActionsService],
})
export class UserActionsModule {}
