import { Injectable } from '@nestjs/common';
import { IConfirmationTokenService } from './confirmation-token.interfaces';
import { PrismaService } from '../prisma.service';
import { uuid } from 'uuidv4';

@Injectable()
export class ConfirmationTokenService implements IConfirmationTokenService {
  constructor(private readonly _prismaService: PrismaService) {}

  async createToken(userId: number): Promise<string> {
    const tokenCandidate = await this.findToken(userId);
    if (tokenCandidate) {
      return tokenCandidate.token;
    }

    const token = uuid();
    const dbToken = await this._prismaService.confirmationToken.create({
      data: { token, userId },
    });
    return dbToken.token;
  }

  async deleteToken(userId: number): Promise<void> {
    const token = await this.findToken(userId);
    if (!token) {
      return;
    }

    await this._prismaService.confirmationToken.delete({ where: { userId } });
  }

  async findToken(userId) {
    return this._prismaService.confirmationToken.findUnique({
      where: { userId },
    });
  }
}
