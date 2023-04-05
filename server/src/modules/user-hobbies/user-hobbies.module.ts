import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHobbiesController } from './user-hobbies.controller';
import { UserHobbies } from './user-hobbies.entity';
import { UserHobbiesService } from './user-hobbies.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserHobbies])],
  controllers: [UserHobbiesController],
  providers: [UserHobbiesService],
})
export class UserHobbiesModule {}
