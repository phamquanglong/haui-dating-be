import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { User } from '../users/user.entity';
import { UpdateConversationDto } from './conversation.dto';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationService: ConversationsService) {}

  // @Get()
  // getAll() {
  //   return this.conversationService.getAll();
  // }

  @Get()
  @UseGuards(JwtGuard)
  getAllConversationByUserId(@Req() request: Request & { user: User }) {
    return this.conversationService.getAllConversationByUserId(request.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateConversation(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request & { user: User },
    @Body() body: UpdateConversationDto,
  ) {
    return this.conversationService.update(id, request.user.id, body);
  }
}
