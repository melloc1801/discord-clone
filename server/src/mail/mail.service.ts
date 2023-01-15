import { Injectable } from '@nestjs/common';
import { IMailService } from './mail.interfaces';
import { User } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { confirmationConfig } from './templates/confirmation/config';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly _mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string): Promise<void> {
    const url = `example.com/auth/confirm?token=${token}`;

    await this._mailerService.sendMail({
      to: user.email,
      from: confirmationConfig.from,
      subject: confirmationConfig.subject,
      template: 'confirmation/template',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
