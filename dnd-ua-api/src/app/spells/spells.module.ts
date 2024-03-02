import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SpellsService } from 'dnd-ua-api/src/app/spells/spells.service';
import { SpellsController } from 'dnd-ua-api/src/app/spells/spells.controller';
import { Spell, SpellSchema } from 'dnd-ua-api/src/app/spells/schemas/Spell.schema';
import { SpellMigrationService } from 'dnd-ua-api/src/app/spells/migrations/spell-migration.service';
import { UsersModule } from 'dnd-ua-api/src/app/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Spell.name, schema: SpellSchema }
    ]),
    UsersModule
  ],
  controllers: [SpellsController],
  providers: [SpellsService, SpellMigrationService],
})
export class SpellsModule implements OnModuleInit {
  constructor(private spellMigrationService: SpellMigrationService) {}

  onModuleInit() {
    this.spellMigrationService.runMigrations();
  }
}
