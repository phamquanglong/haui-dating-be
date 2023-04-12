import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { User } from '../users/user.entity';
import { PostMessageDto, UpdateMessageDto } from './message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get(':conversationId')
  @UseGuards(JwtGuard)
  getMessagesByConversationId(
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    return this.messagesService.getMessagesByConversationId(conversationId);
  }

  @Post()
  @UseGuards(JwtGuard)
  postMessage(
    @Body() body: PostMessageDto,
    @Req() request: Request & { user: User },
  ) {
    return this.messagesService.postMessage(request.user, body);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateMessage(
    @Body() body: UpdateMessageDto,
    @Req() request: Request & { user: User },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.messagesService.updateMessage(id, request.user, body);
  }
}
