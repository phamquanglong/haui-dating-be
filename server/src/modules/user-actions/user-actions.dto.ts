import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum Action {
  LIKE = 'like',
  DISLIKE = 'dislike',
}
export enum TYPE {
  LIKED = 'liked',
  DISLIKED = 'disliked',
  LIKED_ME = 'liked-me',
}

export class UserActionRequestDto {
  @IsNumber()
  @IsNotEmpty()
  targetUserId: number;

  @IsEnum(Action)
  @IsNotEmpty()
  action: Action;
}

export class UserActionQueryDto {
  @IsEnum(TYPE)
  @IsNotEmpty()
  type: TYPE;
}
