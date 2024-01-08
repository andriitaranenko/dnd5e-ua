import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as xlsx from 'xlsx';

import { Spell } from "./entities/spell.entity";
import { Class } from "../classes/entities/class.entity";

export class SpellTableTranslationKeys {
  static NAME = 'Назва (англійською)';
  
  static RESOURCE = 'Посилання на оригінал';

  static TRANSLATED_NAME = 'Назва (українською)';

  static LEVEL = 'Рівень';

  static DESCRIPTION = 'Опис';

  static CLASSES = 'Клас';
}

@Injectable({})
export class SpellsSeedService {
  private readonly path: string = 'dnd-ua-api/src/assets/dnd_spells_ua.xlsx';

  public constructor(
    @InjectRepository(Spell)
    public readonly spellRepository: Repository<Spell>,
    @InjectRepository(Class)
    public readonly classRepository: Repository<Class>
  ) { }

  async readSpellsXlsxFile() {
    try {
      const file = xlsx.readFile(this.path);
    
      const sheetNames = file.SheetNames;
  
      const sheets = file.Sheets;
  
      const classesSheetName = 'Усі заклаття';
      const classesSheetNameIndex = sheetNames.find(name => name === classesSheetName);
  
      const classesSheet = sheets[classesSheetNameIndex];
  
      let data = xlsx.utils.sheet_to_json(classesSheet);
  
      return data;
    } catch (error) {
      console.error('Spell seed service error: ', error);
      return [];
    }
  }

  async seed(defaultSpells: any[]) {
    const spellsList = [];

    const classesTable = await this.classRepository.find();

    for (let spellItem of defaultSpells) {
      const newClass = this.spellRepository.create({
        originalName: spellItem[SpellTableTranslationKeys.NAME],
        resource: spellItem[SpellTableTranslationKeys.RESOURCE],
        translatedName: spellItem[SpellTableTranslationKeys.TRANSLATED_NAME],
        level: this.parseSpellLevel(spellItem),
        description: spellItem[SpellTableTranslationKeys.DESCRIPTION],
        classes: classesTable.filter(classItem => (spellItem[SpellTableTranslationKeys.CLASSES] as string[]).includes(classItem.name)),

      });
      spellsList.push(newClass);
    }

    await this.spellRepository.delete({});
    await this.spellRepository.save(spellsList);
  }

  private parseSpellLevel(spell: { [key: string]: string }): number {
    if (spell[SpellTableTranslationKeys.LEVEL] === 'Замовляння') return 0;

    return parseInt(spell[SpellTableTranslationKeys.LEVEL]);
  }
}