import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

import { CreateUserDto } from 'dnd-ua-api/src/app/users/dto/create-user.dto';
import { RefreshJwtGuard } from 'dnd-ua-api/src/app/auth/guards/refresh-token.guard';
import { LocalAuthGuard } from 'dnd-ua-api/src/app/auth/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() request) {
    return this.authService.refreshToken(request.user);
  }
}
