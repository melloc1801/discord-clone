import { ConfirmationToken } from '@prisma/client';

export interface IConfirmationTokenService {
  createToken(userId: number): Promise<string>;

  deleteToken(userId: number): Promise<void>;

  findToken(userId): Promise<ConfirmationToken>;
}
