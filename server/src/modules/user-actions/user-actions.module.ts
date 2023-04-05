import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActionsController } from './user-actions.controller';
import { UserActions } from './user-actions.entity';
import { UserActionsService } from './user-actions.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserActions])],
  controllers: [UserActionsController],
  providers: [UserActionsService],
})
export class UserActionsModule {}
