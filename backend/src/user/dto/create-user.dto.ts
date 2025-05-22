import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username:String

    @IsString()
    @IsNotEmpty()
    role:string

    @IsString()
    image:string

}
