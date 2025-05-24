import { IsNotEmpty, IsMongoId, IsArray , IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username:String

    @IsString()
    @IsNotEmpty()
    role:string

    @IsString()
    image:string

    @IsString()
    imagebg:string
}
