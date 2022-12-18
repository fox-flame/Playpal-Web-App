import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGigDto {
  @IsString()
  @IsNotEmpty()
  userID: string;

  @IsString()
  @IsNotEmpty()
  headline: string;

  @IsString()
  @IsNotEmpty()
  sports: string;

  @IsString()
  @IsNotEmpty()
  myVenue: string;

  @IsString()
  @IsNotEmpty()
  teachingLevel: string;

  @IsString()
  @IsNotEmpty()
  duties: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
