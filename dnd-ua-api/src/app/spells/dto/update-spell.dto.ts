import { IsOptional, IsString, IsNumber, IsArray } from "class-validator";

export class UpdateSpellDto {

  @IsOptional()
  @IsString()
  originalName?: string;
  
  @IsOptional()
  @IsString()
  sourceUrl?: string;
  
  @IsOptional()  
  @IsString()
  translatedName?: string;
  
  @IsOptional()
  @IsNumber()
  level?: number;
  
  @IsOptional()
  @IsString()
  castingTime?: string;
  
  @IsOptional()
  @IsNumber()
  range?: number;
  
  @IsOptional()
  @IsArray()
  components?: string[];
  
  @IsOptional()
  @IsNumber()
  duration?: number;
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsArray()
  spellUsers?: string[];
}
