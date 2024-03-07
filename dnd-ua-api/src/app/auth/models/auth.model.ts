import { SetMetadata } from '@nestjs/common';

export enum Roles {
  ADMIN = 'admin',
  MASTER = 'master',
  USER = 'user',
}

export const UseRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
