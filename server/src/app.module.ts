import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfirmationTokenModule } from './confirmation-token/confirmation-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
    ConfirmationTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
