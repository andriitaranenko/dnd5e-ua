import { CreateClassDto } from "../../classes/dto/create-class.dto";

export class CreateSpellDto {
  
  original_name: string;

  resource: string;

  translatedName: string;

  level: number;

  description: string;

  classes: CreateClassDto[];
}
