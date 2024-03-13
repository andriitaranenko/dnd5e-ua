import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SpellsModule } from 'dnd-ua-api/src/app/spells/spells.module';
import { UsersModule } from 'dnd-ua-api/src/app/users/users.module';
import { AuthModule } from 'dnd-ua-api/src/app/auth/auth.module';
import { CharactersModule } from 'dnd-ua-api/src/app/characters/characters.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/dnd_ua'), SpellsModule, UsersModule, AuthModule, CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
