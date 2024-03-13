import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createCharacterDto } from 'dnd-ua-api/src/app/characters/dto/create-character.dto';
import { LearnSpellDto } from 'dnd-ua-api/src/app/characters/dto/learn-spell.dto';
import { Character, CharacterDocument } from 'dnd-ua-api/src/app/characters/schemas/Character.schema';
import { SpellsService } from 'dnd-ua-api/src/app/spells/spells.service';
import { UsersService } from 'dnd-ua-api/src/app/users/users.service';
import { Model } from 'mongoose';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    private usersService: UsersService,
    private spellsService: SpellsService
  ) {}

  async createCharacter(userId: string, createCharacterDto: createCharacterDto) {
    const findUser = await this.usersService.getUserById(userId);
    if (!findUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const findCharacter = await this.getCharacterByName(createCharacterDto.name);
    if (findCharacter) throw new HttpException('Character with this name already exists', HttpStatus.BAD_REQUEST);

    const newCharacter = new this.characterModel({
      ...createCharacterDto,
      level: 1,
    });
    const savedCharacter = await newCharacter.save();
    await findUser.updateOne({
      $push: {
        characters: savedCharacter._id,
      },
    });
    return savedCharacter;
  }

  async getCharacterByName(name: string): Promise<CharacterDocument> {
    return this.characterModel.findOne({ name });
  }

  async learnSpell(userId: string, characterId: string, learnSpellDto: LearnSpellDto) {
    const findUser = await this.usersService.getUserById(userId);
    if (!findUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const { spellId } = learnSpellDto;
    const findCharacter = await this.characterModel.findById(characterId);
    const findSpell = await this.spellsService.findSpellById(spellId);
    const isAllowedSpell = findSpell.spellUser.includes(findCharacter.class);
    if (!isAllowedSpell)
      throw new HttpException('Your class cannot learn spell of another class', HttpStatus.BAD_REQUEST);
    const isSpellAlreadyLearnt = findCharacter.spells.includes(findSpell.id);
    if (isSpellAlreadyLearnt) throw new HttpException('Spell already learnt', HttpStatus.BAD_REQUEST);
    return await findCharacter.updateOne({
      $push: {
        spells: spellId,
      },
    });
  }
}
