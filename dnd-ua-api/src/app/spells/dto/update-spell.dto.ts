import { PartialType } from '@nestjs/mapped-types';
import { CreateSpellDto } from './create-spell.dto';

export class UpdateSpellDto {
  description: string;
} // extends PartialType(CreateSpellDto) {}
