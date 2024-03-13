import { Body, Controller, HttpException, HttpStatus, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from "dnd-ua-api/src/app/auth/guards/jwt.guard";
import { CharactersService } from "dnd-ua-api/src/app/characters/characters.service";
import { createCharacterDto } from "dnd-ua-api/src/app/characters/dto/create-character.dto";
import { LearnSpellDto } from "dnd-ua-api/src/app/characters/dto/learn-spell.dto";

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createCharacter(@Request() request, @Body() createCharacterDto: createCharacterDto) {
    const { id } = request?.user;
    if (!id) throw new HttpException('Invalid user id', HttpStatus.UNAUTHORIZED);
    return this.charactersService.createCharacter(id, createCharacterDto);
  }

  @UseGuards(JwtGuard)
  @Post('/:id/add-spell')
  async learnSpell(@Request() request: any, @Param('id') characterId: string, @Body() learnSpellDto: LearnSpellDto) {
    const userId = request?.user?.id;
    if (!userId) throw new HttpException('Invalid user id', HttpStatus.UNAUTHORIZED);
    return this.charactersService.learnSpell(userId, characterId, learnSpellDto);    
  }
}