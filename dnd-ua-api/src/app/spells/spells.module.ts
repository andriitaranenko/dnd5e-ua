import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spell } from './entities/spell.entity';
import { SpellsService } from './spells.service';
import { SpellsController } from './spells.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Spell])],
  controllers: [SpellsController],
  providers: [SpellsService],
})
export class SpellsModule {}
