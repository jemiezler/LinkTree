import { IsNotEmpty, IsString } from "class-validator"


export class CreateLinkDto {
    @IsString()
    @IsNotEmpty()
    name:string
    @IsString()
    @IsNotEmpty()
    Link:string
}
