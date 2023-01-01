import { IsNotEmpty, IsString } from 'class-validator';

export class uploadDTO {
  @IsString()
  @IsNotEmpty()
  userID!: string;

  DOB?: string;

  experience?: string;
}
