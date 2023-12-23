import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserImagesService } from './user-images.service';
import { JwtGuard } from '../auth/guard';
import { User } from '../users/user.entity';

@Controller('user-images')
export class UserImagesController {
  constructor(private readonly userImageService: UserImagesService) {}

  @Get()
  getAll() {
    return this.userImageService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  getMyInfo(@Param('id') id: any) {
    return this.userImageService.getImageById(id as never);
  }
}
