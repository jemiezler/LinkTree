import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";


export type Linkdocument = Link & Document

@Schema()
export class Link {
    @Prop({required:true})
    name:string
    @Prop({required:true})
    link:string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'User'})
    user: Types.ObjectId
}

export const LinkSchema = SchemaFactory.createForClass(Link)
