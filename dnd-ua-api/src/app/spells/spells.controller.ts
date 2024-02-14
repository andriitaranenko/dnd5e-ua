import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';

import { SpellsService } from 'dnd-ua-api/src/app/spells/spells.service';
import { CreateSpellDto } from 'dnd-ua-api/src/app/spells/dto/create-spell.dto';
import { UpdateSpellDto } from 'dnd-ua-api/src/app/spells/dto/update-spell.dto';
import { FilterSpellDto } from 'dnd-ua-api/src/app/spells/dto/filter-spell.dto';

@Controller('spells')
export class SpellsController {

  /**
   * The constructor.
   * 
   * @param spellsService - spellsService
   */
  constructor(private readonly spellsService: SpellsService) {}

  @Post()
  createSpell(@Body() createSpellDto: CreateSpellDto) {
    return this.spellsService.createSpell(createSpellDto);
  }

  @Get()
  findSpells(@Query() filterSpellDto?: FilterSpellDto) {
    if (filterSpellDto && Object.keys(filterSpellDto).length) {
      return this.spellsService.findSpellsByQuery(filterSpellDto);
    } else {
      return this.spellsService.findAllSpells();
    }
  }

  @Get(':id')
  async findSpellById(@Param('id') id: string) {    
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    const findSpell = await this.spellsService.findSpellById(id);
    if (!findSpell) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    return findSpell;
  }

  @Patch(':id')
  async updateSpellById(@Param('id') id: string, @Body() updateSpellDto: UpdateSpellDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Spell ID', HttpStatus.BAD_REQUEST);
    const updateSpell = await this.spellsService.updateSpellById(id, updateSpellDto);
    if (!updateSpell) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    return updateSpell;
  }

  @Delete(':id')
  async removeSpellById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Spell ID', HttpStatus.BAD_REQUEST);
    const removeSpell = await this.spellsService.removeSpellById(id);
    if (!removeSpell) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    return removeSpell;
  }
}
