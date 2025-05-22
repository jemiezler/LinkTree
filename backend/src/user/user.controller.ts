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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /// Picture

  @Patch(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async editpicture(@Param('id') id:string, @UploadedFile() file: Express.Multer.File){
    const updatedUser = await this.userService.update(id,{ image: file.path })
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'Upload success!',
      updatedUser,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}


  // @Post(':id/upload')
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  // async uploadpicture(
  //   @Param('id') id: string,
  //   @UploadedFile() file: Express.Multer.File
  // ) {

  //   const user = await this.userService.findOne(id);
  //   if (!user) throw new Error('User not found');
    
  //   user.image = file.path;

  //   await user.save();

  //   return {
  //     message: 'Upload success!',
  //     user,
  //   };
  // }
