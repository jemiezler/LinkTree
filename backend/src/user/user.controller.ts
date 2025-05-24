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
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from 'config/multer.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const baseUrl = `http://localhost:3001/upload`;

    const userWithImage = await this.userService.createUser({
      ...createUserDto,
      image: `${baseUrl}/${image.filename}`,
    });

    return userWithImage;
  }


  // Removed duplicate uploadpicture method to resolve duplicate function implementation error.

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id/link')
  async getUserWithLinks(@Param('id') id: string) {
    const user = await this.userService.findUserWithLinks(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // format output
    return {
      name: user.username,
      role: user.role,
      image: user.image,
      link: Array.from(user.links).map((l: any) => ({
        _id: l.id,
        name: l.name,
        link: l.link,
      })),
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadpicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    const baseUrl = `http://localhost:3001/upload`;

    user.image = `${baseUrl}/${file.filename}`;

    await user.save();

    return {
      message: 'Upload success!',
      user: {
        id: user.id,
        image: user.image,
      },
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
