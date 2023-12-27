import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, EntityManager, Repository } from 'typeorm';

import { Spell } from './entities/spell.entity';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';
import { FindSpellsDto } from './dto/find-spells.dto';
import { Class } from '../classes/entities/class.entity';

@Injectable()
export class SpellsService {
  constructor(
    @InjectRepository(Spell)
    private readonly spellsRepository: Repository<Spell>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createSpellDto: CreateSpellDto) {
    const classes = createSpellDto.classes.map(CreateClassDto => new Class(CreateClassDto))
    const spell = new Spell({
      ...createSpellDto,
      classes
    });
    await this.entityManager.save(spell);
  }

  async findAll() {
    return this.spellsRepository.find({ relations: { classes: true } });
  }

  async findMany(findSpellsDto: FindSpellsDto) {
    const { originalName, translatedName, level, classes, search } = findSpellsDto;

    const queryBuilder = this.spellsRepository.createQueryBuilder('spell');

    originalName && queryBuilder.andWhere('spell.originalName = :originalName', { originalName });
    translatedName && queryBuilder.andWhere('spell.translatedName = :translatedName', { translatedName });
    level && queryBuilder.andWhere('spell.level = :level', { level });

    if (classes) {
      const classesNames = classes.split(';');

      queryBuilder.andWhere('spellClass.id IN (:...classesNames)', { classesNames });
    }

    if (search) {
      queryBuilder.andWhere(new Brackets(queryBuilder => {
        queryBuilder.where('LOWER(spell.originalName) LIKE LOWER(:search)', { search: `%${search}%`})
          .orWhere('LOWER(spell.translatedName) LIKE LOWER(:search)', { search: `%${search}%`})
      }))
    }

    return queryBuilder
      .innerJoin('spell.classes', 'spellClass')
      .select(['spell'])
      .getMany();
  }

  async findOne(id: number) {
    return this.spellsRepository.findOneBy({ id });
  }

  async update(id: number, updateSpellDto: UpdateSpellDto) {
    await this.spellsRepository.update({ id }, { ...updateSpellDto });
  }

  async remove(id: number) {
    await this.spellsRepository.delete(id);
  }
}
