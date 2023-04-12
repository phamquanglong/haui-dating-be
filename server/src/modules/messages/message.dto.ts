import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostMessageDto {
  @IsNotEmpty()
  @IsNumber()
  conversationId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}

export class UpdateMessageDto {
  isDelete?: boolean;
  isSeen?: boolean;
}
