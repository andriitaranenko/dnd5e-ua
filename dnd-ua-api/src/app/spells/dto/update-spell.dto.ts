import { SpellComponents, SpellUser, AreaType, AbilityScore, SaveSuccessEffect, DamageType, SpellCastingTime } from '@dnd-ua/shared-lib';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSpellDto {
  @ApiProperty({ type: String, description: 'spell name in english', example: 'Fireball', required: true })
  @IsNotEmpty()
  @IsString()
  originalName: string;
  
  @ApiProperty({ type: String, description: 'spell default resource url', example: 'http://dnd5e.wikidot.com/spell:acid-splash', required: true })
  @IsNotEmpty()
  @IsString()
  sourceUrl: string;
  
  @ApiProperty({ type: String, description: 'translated spell name', example: 'Вогняна куля', required: true})
  @IsNotEmpty()  
  @IsString()
  translatedName: string;

  @ApiProperty({ type: Number, description: 'spell level', example: '0 == Cantrip, 1 - 9', required: true })
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @ApiProperty({ type: Boolean, description: 'spell concentration flag', required: true })
  @IsNotEmpty()
  @IsBoolean()
  concentration: boolean;

  @ApiProperty({ type: Boolean, description: 'spell ritual flag', required: true })
  @IsNotEmpty()
  @IsBoolean()
  ritual: boolean;

  @ApiProperty({ type: String, description: 'spell effect', example: 'damage', required: false })
  @IsOptional()
  @IsString()
  effect?: string;

  @ApiProperty({ type: String, enum: SpellCastingTime, description: 'spell casting time', required: true })
  @IsNotEmpty()
  @IsEnum(SpellCastingTime)
  castingTime: SpellCastingTime;

  @ApiProperty({ type: Number, description: 'spell range', required: true })
  @IsNotEmpty()
  @IsNumber()
  range: number;

  @ApiProperty({ type: String, enum: AreaType, description: 'spell area type', required: false })
  @IsOptional()
  @IsNumber()
  area?: number;

  @ApiProperty({ type: String, enum: AreaType, description: 'spell area type', required: false })
  @IsOptional()
  @IsEnum(AreaType)
  areaType?: AreaType;

  @ApiProperty({ type: [String], enum: SpellComponents, isArray: true, description: 'spell components', required: true })
  @IsNotEmpty()
  @IsEnum(SpellComponents)
  components: SpellComponents[];

  @ApiProperty({ type: String, description: 'spell materials', required: false })
  @IsOptional()
  @IsString()
  materials?: string;

  @ApiProperty({ type: Number, description: 'spell duration in seconds', required: true })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ type: String, description: 'spell description', required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: String, description: 'spell higher level update description', required: false })
  @IsOptional()
  @IsString()
  higherLevel?: string;

  @ApiProperty({ type: [String], enum: SpellUser, isArray: true, description: 'spell casters', required: true })
  @IsNotEmpty()
  @IsArray()
  spellUsers: SpellUser[];

  @ApiProperty({ type: String, enum: AbilityScore, description: 'spell save throw ability score', required: false })
  @IsNotEmpty()
  @IsEnum(AbilityScore)
  saveType?: AbilityScore;

  @ApiProperty({ type: String, enum: SaveSuccessEffect, description: 'spell save throw ability score success effect', required: false })
  @IsNotEmpty()
  @IsEnum(SaveSuccessEffect)
  saveSuccess?: SaveSuccessEffect;

  @ApiProperty({ type: String, enum: DamageType, description: 'spell damage type', required: false })
  @IsNotEmpty()
  @IsEnum(DamageType)
  damageType?: DamageType;

  @ApiProperty({ type: String, description: 'spell damage points', example: '1d4', required: false })
  @IsOptional()
  @IsString()
  damageHP?: string; // e.g. 1d6

  @ApiProperty({ type: String, description: 'spell damage modifier points', example: '1d4', required: false })
  @IsOptional()
  @IsString()
  damageLevelModifier?: string;

  @ApiProperty({ type: String, description: 'spell healing points', example: '1d4', required: false })
  @IsOptional()
  @IsString()
  healHP?: string;

  @ApiProperty({ type: String, description: 'spell healing modifier points', example: '1d4', required: false })
  @IsOptional()
  @IsString()
  healLevelModifier?: string;
}
