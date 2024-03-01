import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'dnd-ua-api/src/app/users/schemas/User.schema';
import { UsersController } from 'dnd-ua-api/src/app/users/users.contoller';
import { UsersService } from 'dnd-ua-api/src/app/users/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
