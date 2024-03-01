import { Controller } from '@nestjs/common';
import { UsersService } from 'dnd-ua-api/src/app/users/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
