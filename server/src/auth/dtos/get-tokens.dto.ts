import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetTokensDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
