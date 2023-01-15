import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@Exclude()
export class SigninDto {
  @Expose()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
