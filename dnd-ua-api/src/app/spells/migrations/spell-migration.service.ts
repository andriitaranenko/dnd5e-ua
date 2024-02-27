import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Spell } from "dnd-ua-api/src/app/spells/schemas/Spell.schema";
import { Model } from "mongoose";

@Injectable()
export class SpellMigrationService {
  constructor(
    @InjectModel(Spell.name) private readonly spellModel: Model<Spell>
  ) { }

  async runMigrations() {
    try {
      // await this.migration0();
    } catch {}
  }

  async migration0() {
    try {      
      const spells = await this.spellModel.find({ concentration: undefined });      

      const ids = spells.map(spell => spell.id);
      
      await this.spellModel.updateMany({ _id: { $in: ids } }, { concentration: false })
    } catch (error) {
      console.error(error);
    }
  }
}