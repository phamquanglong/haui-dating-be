import { Module } from '@nestjs/common';
import { UserImagesController } from './user-images.controller';
import { UserImagesService } from './user-images.service';

@Module({
  controllers: [UserImagesController],
  providers: [UserImagesService]
})
export class UserImagesModule {}
