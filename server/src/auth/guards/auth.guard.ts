import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from '../auth.interfaces';
import { IUserService } from '../../user/user.interfaces';
import { AUTH_INTERFACES_MAPPING } from '../auth.constants';
import { USER_INTERFACES_MAPPING } from '../../user/user.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_INTERFACES_MAPPING.IAuthService)
    private readonly _authService: IAuthService,
    @Inject(USER_INTERFACES_MAPPING.IUserService)
    private readonly _userService: IUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessToken = req.get('Authorization').split(' ')[1];

    const payload = this._authService.verifyAccessToken(accessToken);
    if (!payload) {
      throw new UnauthorizedException();
    }

    req.user = await this._userService.getUserByEmail(payload.email);
    return true;
  }
}
