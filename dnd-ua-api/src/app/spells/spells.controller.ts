import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { SpellsService } from './spells.service';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';
import { FindSpellsDto } from './dto/find-spells.dto';

@Controller('spells')
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Post()
  async create(@Body() createSpellDto: CreateSpellDto) {
    return this.spellsService.create(createSpellDto);
  }

  @Get()
  async findSpells(@Query() query: FindSpellsDto) {
    if (Object.keys(query).length) {
      return this.spellsService.findMany(query);  
    }

    return this.spellsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.spellsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSpellDto: UpdateSpellDto) {
    return this.spellsService.update(+id, updateSpellDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.spellsService.remove(+id);
  }
}
