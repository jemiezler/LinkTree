import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({})
  image: string;
  @Prop({})
  imagebg: string;
  @Prop({ required:true})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('links', {
  ref: 'Link',               // ชื่อ model ที่จะอ้างอิง
  localField: '_id',         // ฟิลด์ใน User
  foreignField: 'user',      // ฟิลด์ใน Link ที่อ้างอิง User
});UserSchema.virtual('links', {
  ref: 'Link',
  localField: '_id',
  foreignField: 'user',
});
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });


