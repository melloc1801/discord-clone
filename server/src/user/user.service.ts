import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { USER_ERROR } from './user.error';
import { plainToClass } from 'class-transformer';
import { GetUserDto } from './dtos/get-user.dto';
import * as crypto from 'crypto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { IUserService } from './user.interfaces';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { GetUserWithPasswordDto } from './dtos/get-user-with-password.dto';

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
    const user = await this._prisma.user.create({
      data: {
        ...userData,
        outerId: code,
        passwordHash,
        refreshToken,
      },
    });

    return plainToClass(GetUserDto, user);
  }

  async updateProfile(
    username: string,
    outerId: number,
    updateUserDto: UpdateProfileDto,
  ) {
    const userWithUsername = await this.getUserByUsername(username, outerId);
    if (!userWithUsername) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    if (updateUserDto.username) {
      const userWithNewUsername = await this.getUserByUsername(
        updateUserDto.username,
        outerId,
      );
      if (userWithNewUsername) {
        throw new BadRequestException(USER_ERROR.USER_ALREADY_EXISTS);
      }
    }

    await this._prisma.user.update({
      where: { username_outerId: { username, outerId } },
      data: { ...updateUserDto },
    });
  }
  async changePassword(
    username: string,
    outerId: number,
    { currentPassword, newPassword }: ChangePasswordDto,
  ) {
    const userWithUsername = await this.getUserOneWithPassword(
      username,
      outerId,
    );
    if (!userWithUsername) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    const currentPasswordHash = this.hashPassword(currentPassword);
    if (userWithUsername.passwordHash !== currentPasswordHash) {
      throw new BadRequestException(USER_ERROR.WRONG_PASSWORD);
    }

    const newPasswordHash = this.hashPassword(newPassword);
    await this._prisma.user.update({
      where: { username_outerId: { username, outerId } },
      data: { passwordHash: newPasswordHash },
    });
  }

  async updateRefreshToken(
    username: string,
    outerId: number,
    refreshToken: string,
  ) {
    const user = await this.getUserByUsername(username, outerId);
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    await this._prisma.user.update({
      where: { username_outerId: { username, outerId } },
      data: { refreshToken },
    });
  }

  async getUserByUsername(username: string, outerId: number) {
    const user = this._prisma.user.findFirst({
      where: { username, outerId },
    });
    return plainToClass(GetUserDto, user);
  }

  async getUserOneWithPassword(username: string, outerId: number) {
    const user = this._prisma.user.findFirst({
      where: { username, outerId },
    });
    return plainToClass(GetUserWithPasswordDto, user);
  }

  async confirmUser(username: string, outerId: number) {
    const user = await this.getUserByUsername(username, outerId);
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    await this._prisma.user.update({
      where: { username_outerId: { username, outerId } },
      data: {
        isConfirmed: true,
      },
    });
  }

  async delete(username: string, outerId: number) {
    const user = await this.getUserByUsername(username, outerId);
    if (!user) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }

    await this._prisma.user.delete({
      where: { username_outerId: { username, outerId } },
    });
  }

  private hashPassword(password: string) {
    return crypto.pbkdf2Sync(password, '', 16, 64, 'sha512').toString(`hex`);
  }
}
