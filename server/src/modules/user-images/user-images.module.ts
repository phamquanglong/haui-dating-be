import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserImagesController } from './user-images.controller';
import { UserImage } from './user-images.entity';
import { UserImagesService } from './user-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserImage])],
  controllers: [UserImagesController],
  providers: [UserImagesService],
})
export class UserImagesModule {}
