import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsString()
  userID!: string;

  @IsNotEmpty()
  @IsString()
  role!: string;
}
