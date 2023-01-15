import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IAuthService } from './auth.interfaces';
import { AUTH_INTERFACES_MAPPING } from './auth.constants';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { AUTH_ERROR } from './auth.error';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_INTERFACES_MAPPING.IAuthService)
    private readonly _authService: IAuthService,
  ) {}

  @Post('/signin')
  signin(@Body() signinDto: SigninDto) {
    return this._authService.signin(signinDto);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this._authService.signup(signupDto);
  }

  @Post('/refresh')
  refreshTokens(@Headers('Authorization') bearer: string) {
    const token = bearer.split(' ')[1];
    if (!token) {
      throw new BadRequestException(AUTH_ERROR.AUTH_INVALID_TOKEN);
    }

    return this._authService.refreshTokens(token);
  }

  @Post('/confirm/:userId/:token')
  confirm(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('token') token: string,
  ) {
    return this._authService.confirmAccount(userId, token);
  }
}
