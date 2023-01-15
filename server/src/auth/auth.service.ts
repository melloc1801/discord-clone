import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from './auth.interfaces';
import { GetUserDto } from '../user/dtos/get-user.dto';
import { GetTokensDto } from './dtos/get-tokens.dto';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { IUserService } from '../user/user.interfaces';
import * as process from 'process';
import { USER_INTERFACES_MAPPING } from '../user/user.constant';
import { plainToClass } from 'class-transformer';
import { AUTH_ERROR } from './auth.error';
import { TokenPayloadType, VerifiedTokenPayload } from './auth.types';
import { IConfirmationTokenService } from '../confirmation-token/confirmation-token.interfaces';
import { CONFIRMATION_INTERFACES_MAPPING } from '../confirmation-token/confirmation-token.constants';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly _jwtService: JwtService,
    @Inject(USER_INTERFACES_MAPPING.IUserService)
    private readonly _userService: IUserService,
    @Inject(CONFIRMATION_INTERFACES_MAPPING.IConfirmationTokenService)
    private readonly _confirmationTokenService: IConfirmationTokenService,
  ) {}

  async signin(signinDto: SigninDto): Promise<GetTokensDto> {
    const user = await this._userService.getUserByEmail(signinDto.email);
    if (!user) {
      throw new BadRequestException(AUTH_ERROR.AUTH_USER_NOT_FOUND);
    }
    if (!user.isConfirmed) {
      throw new BadRequestException(AUTH_ERROR.AUTH_ACCOUNT_NOT_CONFIRMED);
    }

    const isPasswordCorrect = await this._userService.checkPassword(
      signinDto.email,
      signinDto.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException(AUTH_ERROR.AUTH_INCORRECT_PASSWORD);
    }

    const { accessToken, refreshToken } = this.generateTokens({
      email: user.email,
      username: user.username,
    });

    await this._userService.updateRefreshToken(user, refreshToken);

    return { ...plainToClass(GetUserDto, user), accessToken, refreshToken };
  }

  async signup(signupDto: SignupDto): Promise<GetUserDto & GetTokensDto> {
    const { accessToken, refreshToken } = this.generateTokens({
      email: signupDto.email,
      username: signupDto.username,
    });

    const user = await this._userService.create(signupDto, refreshToken);

    return {
      ...plainToClass(GetUserDto, user),
      accessToken,
    };
  }

  generateTokens(payload: TokenPayloadType) {
    const accessToken = this._jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = this._jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<GetUserDto & GetTokensDto> {
    const payload = this.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new BadRequestException(AUTH_ERROR.AUTH_INVALID_TOKEN);
    }

    const user = await this._userService.getUserByEmail(payload.email);
    if (user.refreshToken !== refreshToken) {
      throw new BadRequestException(AUTH_ERROR.AUTH_INVALID_TOKEN);
    }

    const tokens = this.generateTokens({
      email: user.email,
      username: user.username,
    });
    await this._userService.updateRefreshToken(user, tokens.refreshToken);

    return { ...plainToClass(GetUserDto, user), ...tokens };
  }

  async confirmAccount(userId: number, token: string): Promise<void> {
    const tokenCandidate = await this._confirmationTokenService.findToken(
      userId,
    );
    if (!tokenCandidate) {
      throw new BadRequestException(AUTH_ERROR.AUTH_USER_NOT_FOUND);
    }
    if (tokenCandidate.token !== token) {
      throw new BadRequestException(
        AUTH_ERROR.AUTH_INCORRECT_CONFIRMATION_TOKEN,
      );
    }
  }

  verifyAccessToken(token: string): VerifiedTokenPayload | null {
    try {
      const payload = this._jwtService.verify<VerifiedTokenPayload>(token, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      });

      return {
        ...payload,
      };
    } catch (e) {
      return null;
    }
  }

  verifyRefreshToken(token: string): VerifiedTokenPayload | null {
    try {
      const payload = this._jwtService.verify<VerifiedTokenPayload>(token, {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      });
      return {
        ...payload,
      };
    } catch (e) {
      return null;
    }
  }
}
