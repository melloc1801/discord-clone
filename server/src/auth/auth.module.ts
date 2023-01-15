import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { USER_INTERFACES_MAPPING } from '../user/user.constant';
import { AUTH_INTERFACES_MAPPING } from './auth.constants';
import { PrismaService } from '../prisma.service';
import { CONFIRMATION_INTERFACES_MAPPING } from '../confirmation-token/confirmation-token.constants';
import { ConfirmationTokenService } from '../confirmation-token/confirmation-token.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtService,
    {
      provide: AUTH_INTERFACES_MAPPING.IAuthService,
      useClass: AuthService,
    },
    {
      provide: USER_INTERFACES_MAPPING.IUserService,
      useClass: UserService,
    },
    {
      provide: CONFIRMATION_INTERFACES_MAPPING.IConfirmationTokenService,
      useClass: ConfirmationTokenService,
    },
  ],
})
export class AuthModule {}
