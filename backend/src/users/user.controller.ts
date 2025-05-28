import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from 'config/multer.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user with optional profile image.
   * @param createUserDto - The data to create the user with.
   * @param file - The uploaded profile image.
   * @returns The created user.
   */
  @Post()
  @UseInterceptors(FileInterceptor('profile', multerOptions))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<User> {
    return this.userService.create(createUserDto, file?.filename);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User | null> {
    return this.userService.findOne(username);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User | null> {
    return this.userService.remove(id);
  }

  @Patch(':id/profile-image')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadProfileImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadProfileImage(id, file);
  }
}
