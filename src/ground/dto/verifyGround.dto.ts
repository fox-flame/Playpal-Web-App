import { IsString } from 'class-validator';

export class VerifyDTO {
  @IsString()
  id!: string;
  @IsString()
  type!: string;
  @IsString()
  city!: string;
}
