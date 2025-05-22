import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { LinkItemDto } from './dto/create-link-user.dto';
import { UpdateLinkDto } from './dto/updata-link.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.UserModel.create(createUserDto);
  }

  async createLink(id: string, createLink: LinkItemDto) {
    const user = await this.UserModel.findById(id);

    if (!user) throw new Error('user not found');
    user.Link.push(createLink);
    return await user.save();
  }

  async updateLink(
  userId: string,
  linkId: string,
  updateLinkDto: UpdateLinkDto,
) {
  const user = await this.UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  const linkIndex = user.Link.findIndex(
    (link) => link._id?.toString() === linkId,
  );
  if (linkIndex === -1) throw new Error('Link not found');

  user.Link[linkIndex].name = updateLinkDto.name!;
  user.Link[linkIndex].link = updateLinkDto.link!;

  await user.save();
  return user;
}


  async deleteLink(userId:string , linkId:string ) {
    const result = await this.UserModel.findByIdAndUpdate (userId,
      {
        $pull: {
          Link: { _id: new Types.ObjectId(linkId)}
        }
      }, {new: true}
    )

    if (!result) throw new Error('User not found or Link not found');
    return result
  }

  findAll() {
    return this.UserModel.find();
  }

  findOne(id: string) {
    return this.UserModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.UserModel.findByIdAndDelete(id);
  }
}
