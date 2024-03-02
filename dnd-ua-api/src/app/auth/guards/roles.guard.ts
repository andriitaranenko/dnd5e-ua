import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Roles } from 'dnd-ua-api/src/app/auth/models/auth.model';
import { UsersService } from 'dnd-ua-api/src/app/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { id } = request.user;

      const user = await this.usersService.getUserById(id);

      return roles.includes(user.role);
    }

    return false;
  }
}
