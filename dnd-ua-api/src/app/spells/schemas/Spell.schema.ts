import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbilityScore, AreaType, DamageType, SaveSuccessEffect, SpellCastingTime, SpellComponents, SpellUser } from '@dnd-ua/shared-lib';
import { ApiProperty } from '@nestjs/swagger';

export type SpellDocument = Spell & Document;

@Schema()
export class Spell {
  @ApiProperty({ type: String, description: 'spell name in english', example: 'Fireball', required: true })
  @Prop({ required: true })
  originalName: string;

  @ApiProperty({ type: String, description: 'spell default resource url', example: 'http://dnd5e.wikidot.com/spell:acid-splash', required: true })
  @Prop({ required: true })
  sourceUrl: string;

  @ApiProperty({ type: String, description: 'translated spell name', example: 'Вогняна куля', required: true})
  @Prop({ required: true })
  translatedName: string;

  @ApiProperty({ type: Number, description: 'spell level', example: '0 == Cantrip, 1 - 9', required: true })
  @Prop({ required: true })
  level: number; // 0 == Cantrip, 1 - 9

  @ApiProperty({ type: Boolean, description: 'spell concentration flag', required: true })
  @Prop({ required: true })
  concentration: boolean;

  @ApiProperty({ type: Boolean, description: 'spell ritual flag', required: true })
  @Prop({ required: true })
  ritual: boolean;

  @ApiProperty({ type: String, description: 'spell effect', example: 'damage', required: false })
  @Prop({ required: false })
  effect?: string;

  @ApiProperty({ type: String, enum: SpellCastingTime, description: 'spell casting time', required: true })
  @Prop({ type: String, enum: SpellCastingTime, required: true })
  castingTime: SpellCastingTime;

  @ApiProperty({ type: Number, description: 'spell range', required: true })
  @Prop({ required: true })
  range: number; // -1 == Self, 0 == Touch, 1, ..., n

  @ApiProperty({ type: Number, description: 'spell area', required: false })
  @Prop({ required: false })
  area?: number;

  @ApiProperty({ type: String, enum: AreaType, description: 'spell area type', required: false })
  @Prop({ type: String, enum: AreaType, required: false })
  areaType?: AreaType;

  @ApiProperty({ type: [String], enum: SpellComponents, isArray: true, description: 'spell components', required: true })
  @Prop({ type: [String], enum: SpellComponents, required: true })
  components: SpellComponents[];

  @ApiProperty({ type: String, description: 'spell materials', required: false })
  @Prop({ required: false })
  materials?: string;

  @ApiProperty({ type: Number, description: 'spell duration in seconds', required: true })
  @Prop({ required: true })
  duration: number;

  @ApiProperty({ type: String, description: 'spell description', required: true })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ type: String, description: 'spell higher level update description', required: false })
  @Prop({ required: false, default: '' })
  higherLevel?: string;

  @ApiProperty({ type: [String], enum: SpellUser, isArray: true, description: 'spell casters', required: true })
  @Prop({ type: [String], enum: SpellUser, required: true })
  spellUser: SpellUser[];

  @ApiProperty({ type: String, enum: AbilityScore, description: 'spell save throw ability score', required: false })
  @Prop({ type: String, enum: AbilityScore, required: false })
  saveType?: AbilityScore;

  @ApiProperty({ type: String, enum: SaveSuccessEffect, description: 'spell save throw ability score success effect', required: false })
  @Prop({ type: String, enum: SaveSuccessEffect, required: false })
  saveSuccess?: SaveSuccessEffect;

  @ApiProperty({ type: String, enum: DamageType, description: 'spell damage type', required: false })
  @Prop({ type: String, enum: DamageType, required: false })
  damageType?: DamageType;

  @ApiProperty({ type: String, description: 'spell damage points', example: '1d4', required: false })
  @Prop({ required: false })
  damageHP?: string; // e.g. 1d6

  @ApiProperty({ type: String, description: 'spell damage modifier points', example: '1d4', required: false })
  @Prop({ required: false })
  damageLevelModifier?: string;

  @ApiProperty({ type: String, description: 'spell healing points', example: '1d4', required: false })
  @Prop({ required: false })
  healHP?: string;

  @ApiProperty({ type: String, description: 'spell healing modifier points', example: '1d4', required: false })
  @Prop({ required: false })
  healLevelModifier?: string;
}

export const SpellSchema = SchemaFactory.createForClass(Spell);
