import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import mongoose from 'mongoose';

import { SpellsService } from 'dnd-ua-api/src/app/spells/spells.service';
import { CreateSpellDto } from 'dnd-ua-api/src/app/spells/dto/create-spell.dto';
import { UpdateSpellDto } from 'dnd-ua-api/src/app/spells/dto/update-spell.dto';
import { FilterSpellDto } from 'dnd-ua-api/src/app/spells/dto/filter-spell.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Spell } from 'dnd-ua-api/src/app/spells/schemas/Spell.schema';

@ApiTags('Spells')
@Controller('spells')
export class SpellsController {

  /**
   * The constructor.
   * 
   * @param spellsService - spellsService
   */
  constructor(private readonly spellsService: SpellsService) {}

  @ApiOkResponse({
    description: 'Spell was created successfully',
    type: Spell
  })
  @ApiNotFoundResponse({
    description: 'Spell already exists',
  })
  @ApiBody({
    type: CreateSpellDto,
    description: 'Spell structure'
  })
  @Post()
  async createSpell(@Body() createSpellDto: CreateSpellDto): Promise<Spell> {
    const { originalName } = createSpellDto;
    const spells = await this.spellsService.findSpellsByQuery({ originalName })
    if (spells.length) throw new HttpException('Spell already exists', HttpStatus.BAD_REQUEST);
    return this.spellsService.createSpell(createSpellDto);
  }

  @ApiCreatedResponse({
    description: 'Spells found by query',
    type: [Spell]
  })
  @Get()
  findSpells(@Query() filterSpellDto?: FilterSpellDto): Promise<Spell[]> {
    if (filterSpellDto && Object.keys(filterSpellDto).length) {
      return this.spellsService.findSpellsByQuery(filterSpellDto);
    } else {
      return this.spellsService.findAllSpells();
    }
  }

  @ApiOkResponse({
    description: 'Spell found by id',
    type: Spell
  })
  @ApiNotFoundResponse({
    description: 'Spell was not Found',
  })
  @Get(':id')
  async findSpellById(@Param('id') id: string): Promise<Spell> {    
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    const findSpell = await this.spellsService.findSpellById(id);
    if (!findSpell) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    return findSpell;
  }

  @ApiOkResponse({
    description: 'Spell was updated Successfully',
    type: Spell
  })
  @ApiNotFoundResponse({
    description: 'Spell was not Found',
  })
  @ApiBody({
    type: UpdateSpellDto,
    description: 'Spell structure'
  })
  @Patch(':id')
  async updateSpellById(@Param('id') id: string, @Body() updateSpellDto: UpdateSpellDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Spell ID', HttpStatus.BAD_REQUEST);
    const updateSpell = await this.spellsService.updateSpellById(id, updateSpellDto);
    if (!updateSpell) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    return updateSpell;
  }

  @ApiOkResponse({
    description: 'Spell was deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Spell was not Found',
  })
  @Delete(':id')
  async removeSpellById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Spell ID', HttpStatus.BAD_REQUEST);
    const removeSpell = await this.spellsService.removeSpellById(id);
    if (!removeSpell) throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    return removeSpell;
  }
}
