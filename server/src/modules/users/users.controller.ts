import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard';
import { UserInformationRequestDto } from './dto/user-information.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Express } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUser() {
    return this.userService.getAll();
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMyInfo(@Req() request: Request & { user: User }) {
    return request.user;
  }

  @Get('suggest')
  @UseGuards(JwtGuard)
  getUserSuggest(@Req() request: Request & { user: User }) {
    return this.userService.getAllUserSuggest(request.user);
  }

  @Post('information')
  @UseGuards(JwtGuard)
  createInformation(
    @Body() body: UserInformationRequestDto,
    @Req() request: Request & { user: User },
  ) {
    return this.userService.createInformation(request.user.id, body);
  }

  @Patch('information')
  @UseGuards(JwtGuard)
  updateInformation(
    @Body() body: UserInformationRequestDto,
    @Req() request: Request & { user: User },
  ) {
    return this.userService.updateInformation(request.user.id, body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadImageToCloudinary(file);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id as never);
  }

  @Post('noti/:id')
  @UseGuards(JwtGuard)
  pushNotification(
    @Param('id') id: never,
    @Body() body: { title: string; body: string; targetUser: any },
  ) {
    return this.userService.pushNotification(id, body);
  }

  @Post('notitoken')
  @UseGuards(JwtGuard)
  postNotificationToken(
    @Body() body: { token: string },
    @Req() request: Request & { user: User },
  ) {
    return this.userService.postNotificationToken(request.user.id, body.token);
  }
}
