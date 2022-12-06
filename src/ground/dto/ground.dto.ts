import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GroundDTO {
  @IsString()
  name!: string;

  @IsString()
  mapAddress!: string;

  @IsNumber()
  bookingRate!: number;

  @IsString()
  sports!: string;

  @IsString()
  city!: string;

  @IsString()
  website: string;

  @IsString()
  openAt!: string;

  @IsString()
  closeAt!: string;

  @IsString()
  description!: string;

  @IsString()
  ownerID!: string;
}
