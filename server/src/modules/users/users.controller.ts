import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

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

  @Get(':id')
  @UseGuards(JwtGuard)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser({ id });
  }
}
