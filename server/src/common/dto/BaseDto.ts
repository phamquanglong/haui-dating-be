import { IsNumber, IsString } from 'class-validator';

export class BaseDto {
  @IsNumber()
  id: number;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
