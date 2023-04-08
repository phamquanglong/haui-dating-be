import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbiesModule } from '../hobbies/hobbies.module';
import { UserHobbiesController } from './user-hobbies.controller';
import { UserHobbies } from './user-hobbies.entity';
import { UserHobbiesService } from './user-hobbies.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserHobbies]), HobbiesModule],
  controllers: [UserHobbiesController],
  providers: [UserHobbiesService],
  exports: [UserHobbiesService],
})
export class UserHobbiesModule {}
