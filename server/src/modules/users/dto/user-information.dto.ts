import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Gender } from '../../profile/profile.entity';
import { Gender as GenderSetting } from '../../user-settings/user-settings.entity';

class ProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsNumber()
  @IsNotEmpty()
  reputational: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}

class SettingsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  distance: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  old: number[];

  @IsEnum(GenderSetting)
  @IsNotEmpty()
  gender: GenderSetting;
}

export class UserInformationRequestDto {
  @ValidateNested({ each: true })
  @Type(() => ProfileDto)
  profile?: ProfileDto[];

  @IsNumber({}, { each: true })
  hobbies?: number[];

  images?: string[];

  @ValidateNested({ each: true })
  @Type(() => SettingsDto)
  settings?: SettingsDto[];
}
