import { IsNotEmpty, IsString } from 'class-validator';

export class HobbyRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
