import { Module } from '@nestjs/common';
import { UserHobbiesController } from './user-hobbies.controller';
import { UserHobbiesService } from './user-hobbies.service';

@Module({
  controllers: [UserHobbiesController],
  providers: [UserHobbiesService]
})
export class UserHobbiesModule {}
