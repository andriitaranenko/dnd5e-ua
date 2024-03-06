import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from 'dnd-ua-api/src/app/characters/characters.controller';
import { CharactersService } from 'dnd-ua-api/src/app/characters/characters.service';
import { Character, CharacterSchema } from 'dnd-ua-api/src/app/characters/schemas/Character.schema';
import { SpellsModule } from 'dnd-ua-api/src/app/spells/spells.module';
import { UsersModule } from 'dnd-ua-api/src/app/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]), UsersModule, SpellsModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
