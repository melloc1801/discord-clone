import { USER_ACTIVITY_STATUS } from '../user.type';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserDto {
  @Expose()
  username: string;

  @Expose()
  outerId: number;

  @Expose()
  email: string;

  @Expose()
  avatarUrl: string | null;

  @Expose()
  onlineStatus: USER_ACTIVITY_STATUS;

  @Expose()
  refreshToken: string;
}
