import { SpellUser } from "@dnd-ua/shared-lib";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Spell } from "dnd-ua-api/src/app/spells/schemas/Spell.schema";
import mongoose from "mongoose";

export type CharacterDocument = Character & Document;

@Schema()
export class Character {

  @Prop()
  name: string;

  @Prop()
  level: number;

  @Prop({ type: String, enum: SpellUser })
  class: SpellUser;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Spell', required: false, default: [] })
  spells: Spell[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);