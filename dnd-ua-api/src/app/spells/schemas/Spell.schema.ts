import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbilityScore, AreaType, DamageType, SaveSuccessEffect, SpellCastingTime, SpellComponents, SpellUser } from "@dnd-ua/shared-lib";

@Schema()
export class Spell {

  @Prop({ required: true })
  originalName: string;
  
  @Prop({ required: true })
  sourceUrl: string;
  
  @Prop({ required: true })  
  translatedName: string;
  
  @Prop({ required: true })
  level: number; // 0 == Cantrip, 1 - 9

  @Prop({ required: true })
  concentration: boolean;

  @Prop({ required: true })
  ritual: boolean;

  @Prop({ required: false })
  effect?: string;
  
  @Prop({ type: String, enum: SpellCastingTime, required: true })
  castingTime: SpellCastingTime;
  
  @Prop({ required: true })
  range: number; // -1 == Self, 0 == Touch, 1, ..., n

  @Prop({ required: false })
  area?: number;

  @Prop({ type: String, enum: AreaType, required: false })
  areaType?: AreaType;
  
  @Prop({ type: [String], enum: SpellComponents, required: true })
  components: SpellComponents[];

  @Prop({ required: false })
  materials?: string;
  
  @Prop({ required: true })
  duration: number;
  
  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: '' })
  higherLevel?: string;
  
  @Prop({ type: [String], enum: SpellUser, required: true })
  spellUser: SpellUser[];

  @Prop({ type: String, enum: AbilityScore, required: false })
  saveType?: AbilityScore;

  @Prop({ type: String, enum: SaveSuccessEffect, required: false })
  saveSuccess?: SaveSuccessEffect;

  @Prop({ type: String, enum: DamageType, required: false })
  damageType?: DamageType;

  @Prop({ required: false })
  damageHP?: string; // e.g. 1d6

  @Prop({ required: false })
  damageLevelModifier?: string;

  @Prop({ required: false })
  healHP?: string;

  @Prop({ required: false })
  healLevelModifier?: string;
}

export const SpellSchema = SchemaFactory.createForClass(Spell);
