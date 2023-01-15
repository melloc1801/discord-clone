import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { USER_INTERFACES_MAPPING } from './user.constant';
import { JwtService } from '@nestjs/jwt';
import { AUTH_INTERFACES_MAPPING } from '../auth/auth.constants';
import { AuthService } from '../auth/auth.service';
import { CONFIRMATION_INTERFACES_MAPPING } from '../confirmation-token/confirmation-token.constants';
import { ConfirmationTokenService } from '../confirmation-token/confirmation-token.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CacheModule.register(), AuthModule],
  controllers: [UserController],
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
export class UserModule {}
