import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as xlsx from 'xlsx';

import { Class } from "./entities/class.entity";

const defaultClasses = [
  'Wizard',
  'Figter',
  'Palading',
  'Rouge'
  // others
];

export class ClassTableTranslationKeys {
  static NAME: string = 'Назва';
}

@Injectable({})
export class ClassesSeedService {
  private readonly path: string = 'dnd-ua-api/src/assets/dnd_spells_ua.xlsx';

  public constructor(
    @InjectRepository(Class)
    public readonly classRepository: Repository<Class>
  ) { }

  async readClassesXlsxFile() {
    try {
      const file = xlsx.readFile(this.path);
    
      const sheetNames = file.SheetNames;
  
      const sheets = file.Sheets;
  
      const classesSheetName = 'Класи';
      const classesSheetNameIndex = sheetNames.find(name => name === classesSheetName);
  
      const classesSheet = sheets[classesSheetNameIndex];
  
      let data = xlsx.utils.sheet_to_json(classesSheet);
  
      return data;
    } catch (error) {
      console.error('Classes seed service error: ', error);
      return [];
    }
  }

  async seed(defaultClasses: any[]) {
    const classesList = [];

    for (let classItem of defaultClasses) {
      const newClass = this.classRepository.create({
        name: classItem[ClassTableTranslationKeys.NAME]
      });
      classesList.push(newClass);
    }

    await this.classRepository.delete({});
    await this.classRepository.save(classesList);
  }
}