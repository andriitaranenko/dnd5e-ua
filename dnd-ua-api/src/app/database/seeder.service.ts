import { Injectable } from "@nestjs/common";
import { ClassesSeedService } from "../classes/classes.seed";
import { SpellsSeedService } from "../spells/spells.seed";

@Injectable()
export class SeedService {
  constructor(
    private readonly classesService: ClassesSeedService,
    private readonly spellsService: SpellsSeedService,
  ) { }

  async seed() {
    const defaultClasses = await this.classesService.readClassesXlsxFile();
    await this.classesService.seed(defaultClasses);

    const defaultSpells = await this.spellsService.readSpellsXlsxFile();
    await this.spellsService.seed(defaultSpells);
  }
}