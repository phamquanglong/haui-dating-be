import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ConversationsModule } from '../conversations/conversations.module';
import { ProfileModule } from '../profile/profile.module';
import { UserHobbiesModule } from '../user-hobbies/user-hobbies.module';
import { UserImagesModule } from '../user-images/user-images.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfileModule,
    UserImagesModule,
    UserSettingsModule,
    UserHobbiesModule,
    ConversationsModule,
    CloudinaryModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
