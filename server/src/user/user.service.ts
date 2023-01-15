import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { USER_ERROR } from './user.error';
import * as crypto from 'crypto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { IUserService } from './user.interfaces';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, refreshToken: string) {
    const { password, ...userData } = createUserDto;
    const userWithEmail = await this._prisma.user.findFirst({
      where: { email: userData.email },
    });
    if (userWithEmail) {
      throw new BadRequestException(USER_ERROR.USER_ALREADY_EXISTS);
    }

    let code: number;
    do {
      code = Math.floor(Math.random() * 10000);
      const candidate = await this._prisma.user.findFirst({
        where: { username: userData.username, outerId: code },
      });
      if (!candidate) {
        break;
      }
    } while (true);

    const passwordHash = this.hashPassword(createUserDto.password);
    return this._prisma.user.create({
      data: {
        ...userData,
        outerId: code,
        passwordHash,
        refreshToken,
        isConfirmed: true,
      },
    });
  }

  async updateProfile(user: User, updateUserDto: UpdateProfileDto) {
    const userByEmail = await this.getUserByEmail(user.email);
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    if (updateUserDto.username) {
      const userWithNewUsername = await this.getUserByUsername(
        updateUserDto.username,
        userByEmail.outerId,
      );
      if (userWithNewUsername) {
        throw new BadRequestException(USER_ERROR.USER_ALREADY_EXISTS);
      }
    }

    await this._prisma.user.update({
      where: {
        username_outerId: {
          username: userByEmail.username,
          outerId: userByEmail.outerId,
        },
      },
      data: { ...updateUserDto },
    });
  }

  async changePassword(
    user: User,
    { currentPassword, newPassword }: ChangePasswordDto,
  ) {
    const userByEmail = await this.getUserByEmail(user.email);
    if (!userByEmail) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    const currentPasswordHash = this.hashPassword(currentPassword);
    if (userByEmail.passwordHash !== currentPasswordHash) {
      throw new BadRequestException(USER_ERROR.WRONG_PASSWORD);
    }

    const newPasswordHash = this.hashPassword(newPassword);
    await this._prisma.user.update({
      where: {
        username_outerId: {
          username: userByEmail.username,
          outerId: userByEmail.outerId,
        },
      },
      data: { passwordHash: newPasswordHash },
    });
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    const userByEmail = await this.getUserByUsername(
      user.username,
      user.outerId,
    );
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    await this._prisma.user.update({
      where: {
        username_outerId: {
          username: userByEmail.username,
          outerId: userByEmail.outerId,
        },
      },
      data: { refreshToken },
    });
  }

  async getUserByUsername(username: string, outerId: number) {
    return this._prisma.user.findUnique({
      where: { username_outerId: { username, outerId } },
    });
  }

  async getUserByEmail(email: string) {
    return this._prisma.user.findUnique({
      where: { email },
    });
  }

  async confirmUser(id: number) {
    const user = await this._prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    await this._prisma.user.update({
      where: { id },
      data: {
        isConfirmed: true,
      },
    });
  }

  async delete(user: User) {
    const userByEmail = await this.getUserByEmail(user.email);
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    await this._prisma.user.delete({
      where: {
        username_outerId: {
          username: userByEmail.username,
          outerId: userByEmail.outerId,
        },
      },
    });
  }

  async checkPassword(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    const passwordHash = this.hashPassword(password);

    return passwordHash === user.passwordHash;
  }

  private hashPassword(password: string) {
    return crypto.pbkdf2Sync(password, '', 16, 64, 'sha512').toString(`hex`);
  }
}
