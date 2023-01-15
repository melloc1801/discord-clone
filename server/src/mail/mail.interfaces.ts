import { User } from '@prisma/client';

export interface IMailService {
  sendUserConfirmation(user: User, token: string): Promise<void>;
}
