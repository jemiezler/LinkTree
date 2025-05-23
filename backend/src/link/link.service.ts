import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Link, Linkdocument } from './schema/link.entity';

@Injectable()
export class LinkService {

  constructor(@InjectModel(Link.name) private readonly LinkModel: Model<Linkdocument>) {}

  create(createLinkDto: CreateLinkDto) {
    return this.LinkModel.create(createLinkDto)
  }

  findAll() {
    return this.LinkModel.find().populate('user').exec()
  }

  findOne(id: string) {
    return this.LinkModel.findById(id)
  }

  async findAllByName(userId: string) {
  const links = await this.LinkModel.find({ user: new Types.ObjectId(userId) })
    .populate('user')
    .exec();

  console.log('Links:', links);
  return links;
  }

  update(id: string, updateLinkDto: UpdateLinkDto) {
    return this.LinkModel.findByIdAndUpdate(id,updateLinkDto) 
  }

  remove(id: string) {
    return this.LinkModel.findByIdAndDelete(id)
  }
}
