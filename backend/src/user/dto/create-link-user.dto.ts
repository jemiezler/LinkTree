import { IsString } from "class-validator";

export class LinkItemDto {
  @IsString()
  name: string;

  @IsString()
  link: string;
}