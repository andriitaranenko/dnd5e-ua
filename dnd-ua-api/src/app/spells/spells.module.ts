import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from './entities/spell.entity';
import { SpellsService } from './spells.service';
import { SpellsController } from './spells.controller';
import { SpellsSeedService } from './spells.seed';
import { Class } from '../classes/entities/class.entity';
import { SpellClass } from './entities/spell-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spell, Class, SpellClass])],
  controllers: [SpellsController],
  providers: [SpellsService, SpellsSeedService],
  exports: [SpellsSeedService]
})
export class SpellsModule {}
