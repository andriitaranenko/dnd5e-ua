import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";

import { Spell, SpellSchema } from "dnd-ua-api/src/app/spells/schemas/Spell.schema";
import { SpellsSeeder } from "dnd-ua-api/src/app/spells/spells.seeder";

export default seeder({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/dnd_ua"),
    MongooseModule.forFeature([{ name: Spell.name, schema: SpellSchema }]),
  ],
}).run([SpellsSeeder]);