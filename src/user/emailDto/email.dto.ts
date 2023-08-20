import { IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
  @IsString()
  @IsNotEmpty()
  receiverEmail: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
