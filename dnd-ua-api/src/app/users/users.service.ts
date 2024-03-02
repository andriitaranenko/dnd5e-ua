import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'dnd-ua-api/src/app/users/schemas/User.schema';
import { CreateUserDto } from 'dnd-ua-api/src/app/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getUserById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username });
  }
}
