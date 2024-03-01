import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'dnd-ua-api/src/app/auth/auth.contoller';
import { AuthenticationService } from 'dnd-ua-api/src/app/auth/authentication.service';
import { LocalStrategy } from 'dnd-ua-api/src/app/auth/strategies/local.auth';
import { UsersModule } from 'dnd-ua-api/src/app/users/users.module';
import { User, UserSchema } from 'dnd-ua-api/src/app/users/schemas/User.schema';
import { UsersService } from 'dnd-ua-api/src/app/users/users.service';
import { JwtStrategy } from 'dnd-ua-api/src/app/auth/strategies/jwt.auth';
import { RefreshJwtStrategy } from 'dnd-ua-api/src/app/auth/strategies/refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_JWT',
      signOptions: { expiresIn: '3600s' },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [AuthenticationService, UsersService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
