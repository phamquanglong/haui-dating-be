import { IsBoolean, IsEmpty, IsString } from 'class-validator';

export class UpdateConversationDto {
  latestMessage?: string;
  isActive?: boolean;
}
