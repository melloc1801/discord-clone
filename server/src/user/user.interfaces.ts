import { GetUserDto } from './dtos/get-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

export interface IUserService {
  create(
    createUserDto: CreateUserDto,
    refreshToken: string,
  ): Promise<GetUserDto>;

  updateProfile(
    username: string,
    outerId: number,
    updateUserDto: UpdateProfileDto,
  ): Promise<void>;

  changePassword(
    username: string,
    outerId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void>;

  getUserByUsername(username: string, outerId: number): Promise<GetUserDto>;

  delete(username: string, outerId: number): Promise<void>;
}
