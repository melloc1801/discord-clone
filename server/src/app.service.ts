import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly _prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
