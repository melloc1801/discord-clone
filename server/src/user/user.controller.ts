import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Query,
} from '@nestjs/common';
import { GetUserQueryParamsDto } from './dtos/get-user-query-params.dto';
import { IUserService } from './user.interfaces';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly _userService: IUserService,
  ) {}

  @Patch()
  updateProfile(
    @Query() getUserQueryParamsDto: GetUserQueryParamsDto,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this._userService.updateProfile(
      getUserQueryParamsDto.username,
      getUserQueryParamsDto.userOuterId,
      updateProfileDto,
    );
  }

  @Patch('/password')
  changePassword(
    @Query() getUserQueryParamsDto: GetUserQueryParamsDto,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this._userService.changePassword(
      getUserQueryParamsDto.username,
      getUserQueryParamsDto.userOuterId,
      changePasswordDto,
    );
  }

  @Get()
  async getOneByUsername(
    @Query() getUserQueryParamsDto: GetUserQueryParamsDto,
  ) {
    return this._userService.getUserByUsername(
      getUserQueryParamsDto.username,
      getUserQueryParamsDto.userOuterId,
    );
  }

  @Delete()
  deleteUser(@Query() getUserQueryParamsDto: GetUserQueryParamsDto) {
    return this._userService.delete(
      getUserQueryParamsDto.username,
      getUserQueryParamsDto.userOuterId,
    );
  }
}
