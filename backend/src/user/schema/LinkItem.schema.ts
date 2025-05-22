import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Linkitem {
  _id?: Types.ObjectId
  
  @Prop()
  name: string;

  @Prop()
  link: string;
}

export const LinkItemSchema = SchemaFactory.createForClass(Linkitem);
