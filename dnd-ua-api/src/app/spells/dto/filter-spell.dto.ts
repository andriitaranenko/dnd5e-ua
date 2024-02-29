import { SpellUser } from "@dnd-ua/shared-lib";
import { IsEnum, IsOptional, IsString } from "class-validator";

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
  @IsEnum(SpellUser)
  spellUser?: SpellUser[];
}