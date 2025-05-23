import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({})
  image: string;
  @Prop({ required:true})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
