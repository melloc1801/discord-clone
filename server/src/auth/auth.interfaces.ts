import { GetUserDto } from '../user/dtos/get-user.dto';
import { GetTokensDto } from './dtos/get-tokens.dto';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { VerifiedTokenPayload } from './auth.types';

export interface IAuthService {
  signin(signinDto: SigninDto): Promise<GetTokensDto>;

  signup(singupDto: SignupDto): Promise<GetUserDto & GetTokensDto>;

  refreshTokens(refreshToken: string): Promise<GetUserDto & GetTokensDto>;

  confirmAccount(userId: number, token: string): Promise<void>;

  verifyAccessToken(token: string): VerifiedTokenPayload | null;

  verifyRefreshToken(token: string): VerifiedTokenPayload | null;
}
