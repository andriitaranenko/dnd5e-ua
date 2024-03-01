import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersService } from 'dnd-ua-api/src/app/users/users.service';
import { User } from 'dnd-ua-api/src/app/users/schemas/User.schema';
import { CreateUserDto } from 'dnd-ua-api/src/app/users/dto/create-user.dto';
import { CustomJwt } from 'dnd-ua-api/src/app/auth/models/auth.model';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new HttpException('This username or password is wrong.', HttpStatus.BAD_REQUEST);
    }
    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new HttpException('This username or password is wrong.', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async login(user: User): Promise<CustomJwt> {
    const payload = {
      username: user.username,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<CustomJwt> {
    const { username } = createUserDto;
    const existingUser = await this.usersService.getUserByUsername(username);
    if (existingUser) {
      throw new HttpException('Username already exists.', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.usersService.createUser(createUserDto);
    return this.login(newUser);
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
