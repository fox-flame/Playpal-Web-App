import { IsNotEmpty, IsString } from 'class-validator';

export class AddPlayerDTO {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  teamID: string;
}
