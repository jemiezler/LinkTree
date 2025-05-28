import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // 🚀 Create new user, optionally with profile image
  async create(
    createUserDto: CreateUserDto,
    imageFilename?: string,
  ): Promise<User> {
    // Check if a user with the same email already exists
    const existingUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    const createdUser = new this.userModel({
      ...createUserDto,
      image: imageFilename ? `${imageFilename}` : undefined,
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().populate('links').lean().exec();
    users.forEach((user) => {
      if (user.image) {
        user.image = `${process.env.BASE_URL || 'http://localhost:3001'}/upload/${user.image}`;
      }
    });
    return users;
  }

  async findOne(username: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ username })
      .populate('links')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Ensure the user image is formatted correctly
    if (user.image) {
      user.image = `${process.env.BASE_URL || 'http://localhost:3001'}/upload/${user.image}`;
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async remove(id: string): Promise<User | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return deletedUser;
  }

  async uploadProfileImage(
    id: string,
    file: Express.Multer.File,
  ): Promise<{ message: string; user: { id: string; image: string } }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3001/upload';
    user.image = `${baseUrl}/${file.filename}`;
    await user.save();

    return {
      message: 'Profile image uploaded successfully!',
      user: {
        id: user._id.toString(),
        image: user.image,
      },
    };
  }
}
