import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SpellsService } from 'dnd-ua-api/src/app/spells/spells.service';
import { SpellsController } from 'dnd-ua-api/src/app/spells/spells.controller';
import { Spell, SpellSchema } from 'dnd-ua-api/src/app/spells/schemas/Spell.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Spell.name, schema: SpellSchema }
    ])
  ],
  controllers: [SpellsController],
  providers: [SpellsService],
})
export class SpellsModule {}
