import { SpellUser } from "@dnd-ua/shared-lib";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class FilterSpellDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  originalName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  translatedName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({ type: [String], isArray: true, enum: SpellUser })
  @IsOptional()
  @IsEnum(SpellUser)
  spellUser?: SpellUser[];
}