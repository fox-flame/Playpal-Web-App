import { IsNotEmpty, IsString } from 'class-validator';

export class BookGroundDTO {
  @IsNotEmpty()
  @IsString()
  groundID!: string;

  @IsNotEmpty()
  @IsString()
  userID!: string;

  @IsNotEmpty()
  @IsString()
  bookedSlot!: string;

  dates?: string[] = ['14-11-2022', '15-11-2022'];
}
