import { Module } from '@nestjs/common';
import { ConfirmationTokenService } from './confirmation-token.service';
import { CONFIRMATION_INTERFACES_MAPPING } from './confirmation-token.constants';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: CONFIRMATION_INTERFACES_MAPPING.IConfirmationTokenService,
      useClass: ConfirmationTokenService,
    },
  ],
})
export class ConfirmationTokenModule {}
