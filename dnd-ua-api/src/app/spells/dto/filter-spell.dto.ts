import { IsOptional, IsString } from "class-validator";

export class FilterSpellDto {

  @IsOptional()
  @IsString()
  originalName?: string;

  @IsOptional()
  @IsString()
  translatedName?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  spellUser?: string;
}