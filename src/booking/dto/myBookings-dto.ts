import { IsNotEmpty, IsString } from 'class-validator';

export class MyBookingsDTO {
  @IsString()
  @IsNotEmpty()
  userID!: string;

  //   @IsString()
  //   role?: string;
}
