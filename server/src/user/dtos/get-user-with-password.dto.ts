import { Exclude, Expose } from 'class-transformer';
import { GetUserDto } from './get-user.dto';

@Exclude()
export class GetUserWithPasswordDto extends GetUserDto {
  @Expose()
  passwordHash: string;
}
