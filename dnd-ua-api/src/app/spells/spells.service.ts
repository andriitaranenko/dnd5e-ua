import { Injectable } from '@nestjs/common';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';
import { EntityManager, Repository } from 'typeorm';
import { Spell } from './entities/spell.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SpellsService {
  constructor(
    @InjectRepository(Spell)
    private readonly spellsRepository: Repository<Spell>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createSpellDto: CreateSpellDto) {
    const spell = new Spell(createSpellDto);
    await this.entityManager.save(spell);
  }

  async findAll() {
    return this.spellsRepository.find()
  }

  async findOne(id: number) {
    return this.spellsRepository.findOneBy({ id });
  }

  async update(id: number, updateSpellDto: UpdateSpellDto) {
    const spell = await this.spellsRepository.findOneBy({ id });
    spell.description = updateSpellDto.description;
    await this.entityManager.save(spell);
  }

  async remove(id: number) {
    await this.spellsRepository.delete(id);
  }
}
