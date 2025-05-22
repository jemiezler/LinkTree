import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LinkItemDto } from './dto/create-link-user.dto';
import { UpdateLinkDto } from './dto/updata-link.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post(':id/link')
  async createLink(@Param('id') id: string, @Body() createLink: LinkItemDto) {
    return await this.userService.createLink(id, createLink);
  }

  @Patch(':userId/link/:linkId/edit')
  async updateLink(
    @Param('userId') userId: string,
    @Param('linkId') linkId: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.userService.updateLink(userId, linkId, updateLinkDto);
  }

  @Delete(':userId/link/:linkId/delete')
  async deleteLink(@Param('userId') userId: string , @Param('linkId') linkId:string){
    return this.userService.deleteLink(userId,linkId)
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
