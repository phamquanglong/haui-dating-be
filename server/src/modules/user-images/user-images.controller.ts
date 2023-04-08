import { Controller, Get } from '@nestjs/common';
import { UserImagesService } from './user-images.service';

@Controller('user-images')
export class UserImagesController {
  constructor(private readonly userImageService: UserImagesService) {}

  @Get()
  getAll() {
    return this.userImageService.getAll();
  }
}
