import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GroundDTO {
  // [key: string]: GroundDataDTO;
  @IsString()
  name!: string;
  @IsString()
  location!: string;
  @IsNumber()
  price!: number;
  @IsString()
  sportsType!: string;
  @IsString()
  city!: string;
}

export class GroundDataDTO {
  // @IsString()
  // name!: string;
  // @IsString()
  // location!: string;
  // @IsString()
  // ownerId!: string;
  // @IsBoolean()
  // verified!: boolean;
  // @IsNumber()
  // price!: number;
  // @IsString()
  // status!: string;
  // @IsString()
  // sportsType!: string;
  // @IsString()
  // city!: string;
  @IsString()
  name: string;
}
