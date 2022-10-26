import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from "./schemas/user.schema";


@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id }, updateUserDto);
  }

  async removeUser(id: number) {
    return this.userModel.findOneAndDelete({ id });
  }
}
