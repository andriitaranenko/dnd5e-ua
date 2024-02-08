import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSpellDto {
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
  @IsString()
  castingTime: string;
  
  @IsNotEmpty()
  @IsNumber()
  range: number;
  
  @IsNotEmpty()
  @IsArray()
  components: string[];
  
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  
  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsArray()
  spellUsers: string[];
}
