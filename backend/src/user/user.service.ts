import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.UserModel.create(createUserDto);
  }

  findAll() {
    return this.UserModel.find().exec()
  }

  findOne(id: string) {
    return this.UserModel.findById(id).exec()
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto)
  }

  remove(id: string) {
    return this.UserModel.findByIdAndDelete(id)
  }
}
