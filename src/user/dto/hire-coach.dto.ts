import { IsNotEmpty, IsString } from 'class-validator';

export class HireCoachDTO {
  @IsString()
  @IsNotEmpty()
  playerID!: string;

  @IsString()
  @IsNotEmpty()
  coachID: string;
}
