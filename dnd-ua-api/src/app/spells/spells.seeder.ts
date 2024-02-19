import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Spell } from "dnd-ua-api/src/app/spells/schemas/Spell.schema";
import { Model } from "mongoose";

import * as xlsx from 'xlsx';
import { Seeder, DataFactory } from "nestjs-seeder";

export class SpellTableTranslationKeys {
  static ORIGINAL_NAME = 'Назва (оригінал)';
  
  static RESOURCE = 'Посилання на оригінал';

  static TRANSLATED_NAME = 'Назва (переклад)';

  static LEVEL = 'Рівень';

  static CASTING_TIME = 'Час створення';

  static RANGE = 'Радіус дії';

  static COMPONENTS = 'Компоненти';

  static DURATION = 'Тривалість';

  static DESCRIPTION = 'Опис';

  static CLASSES = 'Класи';
}

@Injectable({})
export class SpellsSeeder implements Seeder {

  private readonly path: string = 'dnd-ua-api/src/assets/dnd_spells_ua.xlsx';
  
  constructor(@InjectModel(Spell.name) private spellModel: Model<Spell>) {}

  async readSpellsXlsxFile() {
    try {
      const file = xlsx.readFile(this.path);
    
      const sheetNames = file.SheetNames;
  
      const sheets = file.Sheets;
  
      const classesSheetName = 'Усі заклаття';
      const classesSheetNameIndex = sheetNames.find(name => name === classesSheetName);
  
      const classesSheet = sheets[classesSheetNameIndex];
  
      let data = xlsx.utils.sheet_to_json(classesSheet);
      
      console.log('Spells data extracted from xlsx file successfully.')
      return data;
    } catch (error) {
      console.error('Spell seed service error: ', error);
      return [];
    }
  }

  async seed() {
    const data = await this.readSpellsXlsxFile();

    const spellsList = [];

    for (let spell of data) {
      const newSpell = new this.spellModel({
        originalName: spell[SpellTableTranslationKeys.ORIGINAL_NAME],
        sourceUrl: spell[SpellTableTranslationKeys.RESOURCE],
        translatedName: spell[SpellTableTranslationKeys.TRANSLATED_NAME],
        level: this.parseSpellLevel(spell[SpellTableTranslationKeys.LEVEL]),
        castingTime: spell[SpellTableTranslationKeys.CASTING_TIME],
        range: parseInt(spell[SpellTableTranslationKeys.RANGE]),
        components: (spell[SpellTableTranslationKeys.COMPONENTS] as string).split(',').map(e => e.trim()),
        duration: this.parseSpellDuration(spell[SpellTableTranslationKeys.DURATION]),
        description: spell[SpellTableTranslationKeys.DESCRIPTION],
        spellUsers: (spell[SpellTableTranslationKeys.CLASSES] as string).split(',').map(e => e.trim())
      });
      spellsList.push(newSpell);
    }

    try {
      await this.spellModel.insertMany(spellsList);
      console.log('Spells collection seeded successfully.')
    } catch (error: unknown) {
      console.error('Spell seed service error: ', error);
    }
  }

  async drop(): Promise<any> {
    return this.spellModel.deleteMany({});
  }

  private parseSpellLevel(spell: string): number {
    if (spell === 'Замовляння') return 0;

    return parseInt(spell);
  }

  private parseSpellDuration(spell: string): number {
    if (spell === 'Миттєво') return 0;

    return parseInt(spell);
  }
}