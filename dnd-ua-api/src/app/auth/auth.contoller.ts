import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from 'dnd-ua-api/src/app/auth/authentication.service';
import { CreateUserDto } from 'dnd-ua-api/src/app/users/dto/create-user.dto';
import { RefreshJwtGuard } from 'dnd-ua-api/src/app/auth/guards/refresh-token.guard';
import { LocalAuthGuard } from 'dnd-ua-api/src/app/auth/guards/local.guard';
import { LoginDto, RefreshDto } from 'dnd-ua-api/src/app/auth/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthenticationService) {}

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Authenticated successfully'
  })
  @ApiBadRequestResponse({
    description: 'Username or password is wrong'
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @ApiOkResponse({
    description: 'Registered successfully'
  })
  @ApiBadRequestResponse({
    description: 'User already exists'
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiBody({ type: RefreshDto })
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() request) {
    return this.authService.refreshToken(request.user);
  }
}
