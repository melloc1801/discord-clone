import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { User } from '@prisma/client';

export interface IUserService {
  create(createUserDto: CreateUserDto, refreshToken: string): Promise<User>;

  updateProfile(user: User, updateUserDto: UpdateProfileDto): Promise<void>;

  changePassword(
    user: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void>;

  getUserByUsername(username: string, outerId: number): Promise<User>;

  getUserByEmail(email: string): Promise<User>;

  delete(user: User): Promise<void>;

  checkPassword(email: string, password: string): Promise<boolean>;

  updateRefreshToken(user: User, refreshToken: string): Promise<void>;

  confirmUser(id: number): Promise<void>;
}
