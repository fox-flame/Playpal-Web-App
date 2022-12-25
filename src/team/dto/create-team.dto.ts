import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  playerID: string;

  @IsString()
  @IsNotEmpty()
  teamName: string;

  @IsString()
  @IsNotEmpty()
  teamLocation: string;

  @IsString()
  @IsNotEmpty()
  underAge: string;

  @IsString()
  @IsNotEmpty()
  teamSports: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
