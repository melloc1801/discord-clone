import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { USER_ACTIVITY_STATUS } from '../user.type';

export class UpdateProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @IsOptional()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsOptional()
  password: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatarUrl: string;

  @IsEnum(USER_ACTIVITY_STATUS)
  @IsOptional()
  onlineStatus: USER_ACTIVITY_STATUS;
}
