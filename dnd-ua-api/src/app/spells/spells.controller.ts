import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpellsService } from './spells.service';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';

@Controller('spells')
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Post()
  async create(@Body() createSpellDto: CreateSpellDto) {
    return this.spellsService.create(createSpellDto);
  }

  @Get()
  async findAll() {
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
