import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUserQueryParamsDto } from './dtos/get-user-query-params.dto';
import { IUserService } from './user.interfaces';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { USER_INTERFACES_MAPPING } from './user.constant';
import { plainToClass } from 'class-transformer';
import { GetUserDto } from './dtos/get-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_INTERFACES_MAPPING.IUserService)
    private readonly _userService: IUserService,
  ) {}

  @Patch()
  @UseGuards(AuthGuard)
  updateProfile(
    @GetUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this._userService.updateProfile(user, updateProfileDto);
  }

  @Patch('/password')
  @UseGuards(AuthGuard)
  changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this._userService.changePassword(user, changePasswordDto);
  }

  @Get()
  async getOneByUsername(
    @Query() getUserQueryParamsDto: GetUserQueryParamsDto,
  ) {
    const user = await this._userService.getUserByUsername(
      getUserQueryParamsDto.username,
      getUserQueryParamsDto.userOuterId,
    );
    return plainToClass(GetUserDto, user);
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteUser(@GetUser() user: User) {
    return this._userService.delete(user);
  }
}
