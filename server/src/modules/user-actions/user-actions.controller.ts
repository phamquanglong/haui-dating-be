import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { User } from '../users/user.entity';
import { UserActionQueryDto, UserActionRequestDto } from './user-actions.dto';
import { UserActionsService } from './user-actions.service';

@Controller('user-actions')
export class UserActionsController {
  constructor(private userActionsService: UserActionsService) {}

  @Get()
  getAll() {
    return this.userActionsService.getAll();
  }

  @Get('history')
  @UseGuards(JwtGuard)
  getHistory(
    @Query() type: UserActionQueryDto,
    @Req() request: Request & { user: User },
  ) {
    return this.userActionsService.getHistory(request.user.id, type);
  }
  @Post()
  @UseGuards(JwtGuard)
  createInformation(
    @Body() body: UserActionRequestDto,
    @Req() request: Request & { user: User },
  ) {
    return this.userActionsService.create(request.user, body);
  }
}
