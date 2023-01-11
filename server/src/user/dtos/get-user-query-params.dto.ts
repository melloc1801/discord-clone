import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUserQueryParamsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  username: string;

  @Transform((value) => Number(value.value))
  @IsNumber()
  @Min(0)
  @Max(9999)
  userOuterId: number;
}
