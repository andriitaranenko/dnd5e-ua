import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isNumber, isString } from 'class-validator';

import { Spell } from 'dnd-ua-api/src/app/spells/schemas/Spell.schema';
import { CreateSpellDto } from 'dnd-ua-api/src/app/spells/dto/create-spell.dto';
import { UpdateSpellDto } from 'dnd-ua-api/src/app/spells/dto/update-spell.dto';
import { FilterSpellDto } from 'dnd-ua-api/src/app/spells/dto/filter-spell.dto';

@Injectable()
export class SpellsService {

  /**
   * The contructor.
   * 
   * @param spellModel - Spell Model
   */
  constructor(@InjectModel(Spell.name) private spellModel: Model<Spell>) {}

  /**
   * Adds new spell to collection.
   * 
   * @param createSpellDto - CreateSpellDto
   */
  createSpell(createSpellDto: CreateSpellDto) {
    const newSpell = new this.spellModel(createSpellDto);
    return newSpell.save();
  }

  /**
   * Gets all spells from collection.
   */
  findAllSpells() {
    return this.spellModel.find();
  }

  /**
   * Gets spells based on provided query.
   * 
   * @param filterSpellDto - filterSpellDto
   */
  findSpellsByQuery(filterSpellDto: FilterSpellDto) {
    // checks if filterSpellDto has non falsy values
    if (Object.values(filterSpellDto).every(filter => !Boolean(filter))) {
      return this.findAllSpells();
    }

    const query = { $and: [] };    

    if (filterSpellDto.originalName /* && filterSpellDto.originalName.length > 2 */) {
      query.$and.push({ 'originalName': { $regex: filterSpellDto.originalName, $options: 'i' } });
    }
    if (filterSpellDto.translatedName /* && filterSpellDto.translatedName.length > 2 */) {
      query.$and.push({ 'translatedName': { $regex: filterSpellDto.translatedName, $options: 'i' } });
    }
    if (filterSpellDto.level) {
      const levelArray = filterSpellDto.level.split(',').map(level => Number(level.trim())).filter(level => isNumber(level));
      query.$and.push({ 'level': { $in: levelArray } });
    }
    if (filterSpellDto.spellUser) {
      const spellUserArray = filterSpellDto.spellUser.split(',').map(spellUser => String(spellUser.trim())).filter(spellUser => isString(spellUser));      
      query.$and.push({ 'spellUsers': { $in: spellUserArray } });
    }

    return this.spellModel.find(query);
  }

  /**
   * Gets spell by ID.
   * 
   * @param id - id
   */
  findSpellById(id: string) {
    return this.spellModel.findById(id);
  }

  /**
   * Updates existing spell in collection based on ID.
   * 
   * @param id - id
   * @param updateSpellDto - updateSpellDto
   */
  updateSpellById(id: string, updateSpellDto: UpdateSpellDto) {
    return this.spellModel.findByIdAndUpdate(id, updateSpellDto, { new: true });
  }

    /**
   * Removes existing spell in collection based on ID.
   * 
   * @param id - id
   */
  removeSpellById(id: string) {
    return this.spellModel.findByIdAndDelete(id);
  }
}
