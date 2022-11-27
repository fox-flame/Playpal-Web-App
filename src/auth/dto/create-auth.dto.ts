import { IsString, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
