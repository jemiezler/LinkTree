import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Linkitem, LinkItemSchema } from "./LinkItem.schema";

export type UserDocument = User & Document

@Schema()
export class User {

    @Prop({required:true})
    username:string
    @Prop({})
    image:string
    @Prop({})
    role:string
    @Prop({ type: [LinkItemSchema] })
    Link:Linkitem[]
}

export const UserSchema = SchemaFactory.createForClass(User)