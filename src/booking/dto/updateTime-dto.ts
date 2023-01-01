import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTimeDTO {
  @IsString()
  @IsNotEmpty()
  sports!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  groundID!: string;

  @IsString()
  @IsNotEmpty()
  openAt!: string;

  @IsString()
  @IsNotEmpty()
  closeAt!: string;
}
