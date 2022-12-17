import { IsNotEmpty, IsString } from 'class-validator';

export class SlotDTO {
  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  groundID!: string;
}
