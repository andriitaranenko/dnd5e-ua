import { SetMetadata } from '@nestjs/common';

import { User } from 'dnd-ua-api/src/app/users/schemas/User.schema';

export type AccessToken = string;
export type RefreshToken = string;
export type CustomJwt = User & { accessToken: AccessToken; refreshToken: RefreshToken };

export enum Roles {
  ADMIN = 'admin',
  MASTER = 'master',
  USER = 'user',
}

export const UseRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
