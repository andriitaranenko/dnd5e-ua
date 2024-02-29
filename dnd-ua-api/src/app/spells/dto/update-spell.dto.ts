import { SpellCastingTime, AreaType, SpellComponents, SpellUser, AbilityScore, SaveSuccessEffect, DamageType } from "@dnd-ua/shared-lib";
import { IsOptional, IsString, IsNumber, IsArray, IsBoolean, IsEnum, IsNotEmpty } from "class-validator";

export class UpdateSpellDto {

  @IsNotEmpty()
  @IsString()
  originalName: string;
  
  @IsNotEmpty()
  @IsString()
  sourceUrl: string;
  
  @IsNotEmpty()  
  @IsString()
  translatedName: string;
  
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @IsNotEmpty()
  @IsBoolean()
  concentration: boolean;

  @IsNotEmpty()
  @IsBoolean()
  ritual: boolean;

  @IsOptional()
  @IsString()
  effect?: string;
  
  @IsNotEmpty()
  @IsEnum(SpellCastingTime)
  castingTime: SpellCastingTime;
  
  @IsNotEmpty()
  @IsNumber()
  range: number;
    
  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsEnum(AreaType)
  areaType?: AreaType;

  @IsNotEmpty()
  @IsEnum(SpellComponents)
  components: SpellComponents[];

  @IsOptional()
  @IsString()
  materials?: string;
  
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  
  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsOptional()
  @IsString()
  higherLevel?: string;

  @IsNotEmpty()
  @IsArray()
  spellUsers: SpellUser[];
  
  @IsNotEmpty()
  @IsEnum(AbilityScore)
  saveType?: AbilityScore;

  @IsNotEmpty()
  @IsEnum(SaveSuccessEffect)
  saveSuccess?: SaveSuccessEffect;

  @IsNotEmpty()
  @IsEnum(DamageType)
  damageType?: DamageType;

  @IsOptional()
  @IsString()
  damageHP?: string; // e.g. 1d6

  @IsOptional()
  @IsString()
  damageLevelModifier?: string;

  @IsOptional()
  @IsString()
  healHP?: string;

  @IsOptional()
  @IsString()
  healLevelModifier?: string;
}
